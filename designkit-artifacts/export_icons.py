import os
from PIL import Image

base = "/Users/richard/Documents/老年公寓网站/jinhaiwan-master/designkit-artifacts"
src = os.path.join(base, "Logo_庇护之环_透明背景_0fe8e256.png")

im = Image.open(src).convert("RGBA")
print("源图尺寸:", im.size)

# 单尺寸 PNG（透明）
png_sizes = [16, 32, 48, 180]
for s in png_sizes:
    out = os.path.join(base, f"favicon-{s}.png")
    im.resize((s, s), Image.LANCZOS).save(out, "PNG")
    print("已生成:", out)

# 合并 favicon.ico（含 16/32/48，浏览器自动选最合适尺寸）
ico = os.path.join(base, "favicon.ico")
im.save(ico, "ICO", sizes=[(16, 16), (32, 32), (48, 48)])
print("已生成:", ico)

print("完成")
