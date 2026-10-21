import os
import glob
from PIL import Image
from collections import deque

def remove_background(img_path, out_png_path, tolerance=30):
    img = Image.open(img_path).convert("RGBA")
    width, height = img.size
    img_data = img.getdata()
    
    threshold = 255 - tolerance
    mask_data = []
    for r, g, b, a in img_data:
        if r >= threshold and g >= threshold and b >= threshold:
            mask_data.append(255)
        else:
            mask_data.append(0)
            
    visited = bytearray(width * height)
    bg_pixels = bytearray(width * height)
    queue = deque()
    
    for x in range(width):
        for y in [0, height - 1]:
            idx = y * width + x
            if mask_data[idx] == 255 and not visited[idx]:
                visited[idx] = 1
                queue.append((x, y))
                
    for y in range(height):
        for x in [0, width - 1]:
            idx = y * width + x
            if mask_data[idx] == 255 and not visited[idx]:
                visited[idx] = 1
                queue.append((x, y))
                
    while queue:
        cx, cy = queue.popleft()
        cidx = cy * width + cx
        bg_pixels[cidx] = 255
        
        for nx, ny in [(cx+1, cy), (cx-1, cy), (cx, cy+1), (cx, cy-1)]:
            if 0 <= nx < width and 0 <= ny < height:
                nidx = ny * width + nx
                if not visited[nidx]:
                    visited[nidx] = 1
                    r, g, b, _ = img_data[nidx]
                    if r >= 230 and g >= 230 and b >= 230:
                        queue.append((nx, ny))

    new_data = []
    for i, (r, g, b, a) in enumerate(img_data):
        if bg_pixels[i] == 255:
            new_data.append((r, g, b, 0))
        else:
            x = i % width
            y = i // width
            if r > 225 and g > 225 and b > 225:
                bg_neighbors = 0
                for nx, ny in [(x+1, y), (x-1, y), (x, y+1), (x, y-1)]:
                    if 0 <= nx < width and 0 <= ny < height:
                        if bg_pixels[ny * width + nx] == 255:
                            bg_neighbors += 1
                if bg_neighbors > 0:
                    alpha = max(0, int(255 - (min(r, g, b) - 200) * 4.5))
                    new_data.append((r, g, b, alpha))
                else:
                    new_data.append((r, g, b, 255))
            else:
                new_data.append((r, g, b, 255))
                
    img.putdata(new_data)
    # Resize to a crisp 320x320 icon for faster web loading and crisp display
    img = img.resize((320, 320), Image.Resampling.LANCZOS)
    img.save(out_png_path, "PNG", optimize=True)

def main():
    vocab_dir = r"d:\Nghia\Python\My-Little-Girls-Game\img\vocab"
    jpg_files = glob.glob(os.path.join(vocab_dir, "*.jpg"))
    print(f"Found {len(jpg_files)} JPG files in {vocab_dir}")
    for jpg in jpg_files:
        base = os.path.splitext(jpg)[0]
        png = base + ".png"
        remove_background(jpg, png)
        print("Processed:", os.path.basename(png))
    print("ALL DONE!")

if __name__ == "__main__":
    main()
