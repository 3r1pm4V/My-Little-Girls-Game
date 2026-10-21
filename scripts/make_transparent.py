import os
from PIL import Image, ImageFilter

def make_transparent(img_path, out_path, tolerance=25, blur_radius=1):
    img = Image.open(img_path).convert("RGBA")
    width, height = img.size
    
    # We want to remove the outer white background using flood fill or connected components
    # Create a mask for near-white pixels
    # A pixel is considered background white if R, G, B are all >= 255 - tolerance
    # and it is connected to the outer boundary
    
    # Step 1: Create a binary mask of white pixels
    white_mask = Image.new("L", (width, height), 0)
    img_data = img.getdata()
    mask_data = []
    threshold = 255 - tolerance
    
    for r, g, b, a in img_data:
        if r >= threshold and g >= threshold and b >= threshold:
            mask_data.append(255) # White
        else:
            mask_data.append(0)
    white_mask.putdata(mask_data)
    
    # Step 2: Flood fill from all 4 corners and borders
    # Anything filled from the border is background
    bg_mask = Image.new("L", (width + 2, height + 2), 0)
    
    # FloodFill from PIL.ImageDraw.floodfill or use Image.floodfill (in newer Pillow) or BFS
    from collections import deque
    
    # Fast BFS from image borders
    visited = bytearray(width * height)
    bg_pixels = bytearray(width * height)
    
    queue = deque()
    # Add border pixels that are white
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
        
        # 4 neighbors
        for nx, ny in [(cx+1, cy), (cx-1, cy), (cx, cy+1), (cx, cy-1)]:
            if 0 <= nx < width and 0 <= ny < height:
                nidx = ny * width + nx
                if not visited[nidx]:
                    visited[nidx] = 1
                    # Check if neighbor is near white (with slightly relaxed threshold for smooth edge)
                    r, g, b, _ = img_data[nidx]
                    if r >= 235 and g >= 235 and b >= 235:
                        queue.append((nx, ny))
                    elif r >= 210 and g >= 210 and b >= 210:
                        # Semi-transparent edge
                        pass

    # Create new RGBA image
    new_data = []
    for i, (r, g, b, a) in enumerate(img_data):
        if bg_pixels[i] == 255:
            # Fully transparent
            new_data.append((r, g, b, 0))
        else:
            # Check if it borders a background pixel for anti-aliasing
            x = i % width
            y = i // width
            # If color is very light gray/white on edge, blend alpha
            if r > 230 and g > 230 and b > 230:
                # Calculate distance or average of neighbors
                bg_neighbors = 0
                for nx, ny in [(x+1, y), (x-1, y), (x, y+1), (x, y-1)]:
                    if 0 <= nx < width and 0 <= ny < height:
                        if bg_pixels[ny * width + nx] == 255:
                            bg_neighbors += 1
                if bg_neighbors > 0:
                    alpha = max(0, int(255 - (min(r, g, b) - 200) * 4))
                    new_data.append((r, g, b, alpha))
                else:
                    new_data.append((r, g, b, 255))
            else:
                new_data.append((r, g, b, 255))
                
    img.putdata(new_data)
    img.save(out_path, "PNG")
    print(f"✔ Saved transparent image: {out_path}")

if __name__ == "__main__":
    import sys
    src = sys.argv[1]
    dst = sys.argv[2]
    make_transparent(src, dst)
