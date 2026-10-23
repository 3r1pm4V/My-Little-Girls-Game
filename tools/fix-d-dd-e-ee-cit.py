import sys
import os
import json
import urllib.request
from pydub import AudioSegment
from pydub.silence import split_on_silence, detect_leading_silence

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

FFMPEG_PATH = r"C:\Users\nghiabh\.youtube_mp3_downloader\ffmpeg\ffmpeg.exe"
FFPROBE_PATH = r"C:\Users\nghiabh\.youtube_mp3_downloader\ffmpeg\ffprobe.exe"
if os.path.exists(FFMPEG_PATH):
    AudioSegment.converter = FFMPEG_PATH
if os.path.exists(FFPROBE_PATH):
    AudioSegment.ffprobe = FFPROBE_PATH

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
AUDIO_DIR = os.path.join(ROOT_DIR, "audio")
API_URL = "http://127.0.0.1:8001/api/tts/generate"

def generate_cit_wav(text, out_wav):
    payload = json.dumps({
        "text": text,
        "voice_id": "Mai Anh",
        "format": "wav",
        "speed": 0.9,
        "temperature": 0.65
    }).encode("utf-8")
    req = urllib.request.Request(
        API_URL,
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST"
    )
    with urllib.request.urlopen(req) as resp:
        data = resp.read()
        with open(out_wav, "wb") as f:
            f.write(data)

def trim_edges(seg, silence_thresh=-42):
    start_trim = detect_leading_silence(seg, silence_threshold=silence_thresh, chunk_size=10)
    end_trim = detect_leading_silence(seg.reverse(), silence_threshold=silence_thresh, chunk_size=10)
    dur = len(seg)
    if start_trim + end_trim >= dur:
        return seg
    return seg[start_trim:dur - end_trim]

def split_by_minimum_energy_valley(seg):
    """Tìm điểm có năng lượng thấp nhất (khoảng nghỉ giữa 2 âm) trong khoảng 28%..72% thời lượng."""
    trimmed = trim_edges(seg, silence_thresh=seg.dBFS - 18)
    dur = len(trimmed)
    window_ms = 25
    step_ms = 5
    start_search = int(dur * 0.28)
    end_search = int(dur * 0.72)
    min_rms = float("inf")
    best_ms = dur // 2
    for t in range(start_search, max(start_search + step_ms, end_search - window_ms), step_ms):
        w = trimmed[t:t + window_ms]
        if w.rms < min_rms:
            min_rms = w.rms
            best_ms = t + window_ms // 2
    print(f"  -> Đã tìm thấy thung lũng năng lượng thấp nhất tại {best_ms}/{dur} ms (rms={min_rms})")
    first_part = trim_edges(trimmed[:best_ms], silence_thresh=seg.dBFS - 20)
    second_part = trim_edges(trimmed[best_ms:], silence_thresh=seg.dBFS - 20)
    return first_part, second_part

def split_pair_and_save(text_pair, out_files, use_valley=False):
    tmp_wav = os.path.join(AUDIO_DIR, "_tmp_pair.wav")
    print(f"[CIT] Đang sinh cặp âm thanh chuẩn: {repr(text_pair)} ...")
    generate_cit_wav(text_pair, tmp_wav)
    seg = AudioSegment.from_wav(tmp_wav)
    print(f"  -> Tổng thời lượng: {len(seg)} ms, dBFS: {seg.dBFS:.1f}")

    if use_valley:
        first_seg, second_seg = split_by_minimum_energy_valley(seg)
    else:
        chunks = split_on_silence(
            seg,
            min_silence_len=160,
            silence_thresh=seg.dBFS - 13,
            keep_silence=70
        )
        print(f"  -> Tách được {len(chunks)} đoạn âm thanh: {[len(c) for c in chunks]} ms")
        if len(chunks) == 2:
            first_seg, second_seg = chunks[0], chunks[1]
        else:
            first_seg, second_seg = split_by_minimum_energy_valley(seg)

    for idx, target_list in enumerate(out_files):
        part = first_seg if idx == 0 else second_seg
        padded = AudioSegment.silent(duration=45, frame_rate=part.frame_rate) + part + AudioSegment.silent(duration=65, frame_rate=part.frame_rate)
        for rel_file in target_list:
            full_path = os.path.join(AUDIO_DIR, rel_file)
            padded.export(full_path, format="mp3", bitrate="128k")
            print(f"  ✔ Đã lưu {rel_file} ({os.path.getsize(full_path)} bytes, {len(padded)} ms)")

    if os.path.exists(tmp_wav):
        os.remove(tmp_wav)

if __name__ == "__main__":
    # 1. Cặp phụ âm Dờ - Đờ đặt cùng lúc trong 1 lần gọi API (kèm tag [nghỉ 1s] để CIT tách hơi rõ ràng)
    split_pair_and_save(
        "Dờ [nghỉ 1s] Đờ",
        [
            ["alpha_vi_d.mp3", "cons_d.mp3"],
            ["alpha_vi_dd.mp3", "cons_dd.mp3"]
        ],
        use_valley=False
    )

    # 2. Cặp nguyên âm E - Ê đặt cùng lúc trong 1 lần gọi API
    split_pair_and_save(
        "E [nghỉ 1s] Ê",
        [
            ["alpha_vi_e.mp3"],
            ["alpha_vi_ee.mp3"]
        ],
        use_valley=False
    )

    # 3. Cặp câu đố chữ Dờ - Đờ đặt cùng lúc trong 1 lần gọi API
    split_pair_and_save(
        "Hình nào bắt đầu bằng chữ Dờ đáng yêu? [nghỉ 1s] Hình nào bắt đầu bằng chữ Đờ đáng yêu?",
        [
            ["vp_hinh_nao_bat_dau_bang_chu_d_dang_y_32f8e4.mp3"],
            ["vp_hinh_nao_bat_dau_bang_chu_d_dang_y_d2aaed.mp3"]
        ],
        use_valley=False
    )

    # 4. Cặp câu đố chữ E - Ê đặt cùng lúc trong 1 lần gọi API
    split_pair_and_save(
        "Hình nào bắt đầu bằng chữ E đáng yêu? [nghỉ 1s] Hình nào bắt đầu bằng chữ Ê đáng yêu?",
        [
            ["vp_hinh_nao_bat_dau_bang_chu_e_dang_y_717894.mp3"],
            ["vp_hinh_nao_bat_dau_bang_chu_e_dang_y_7803b3.mp3"]
        ],
        use_valley=False
    )
    print("\n🎉 Hoàn tất tách & lưu chuẩn phát âm Dờ/Đờ và E/Ê!")
