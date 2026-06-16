import re
with open('src/components/tech/techSlides.js', 'r', encoding='utf-8') as f:
    content = f.read()
for i in range(1, 10):
    m = re.search(f'const presSlide{i} = \(.*?)\;', content, re.DOTALL)
    if m:
        print(f'presSlide{i} reveals:', re.findall(r'data-reveal-at=\.(.*?)\.', m.group(1)))
