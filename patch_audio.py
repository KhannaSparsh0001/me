import base64
import sys

def get_b64(path):
    with open(path, 'rb') as f:
        return base64.b64encode(f.read()).decode('utf-8')

try:
    click_b64 = get_b64('click.wav')
    lose_b64 = get_b64('lose_minesweeper.wav')
    
    with open('shared/system.js', 'r', encoding='utf-8') as f:
        content = f.read()
        
    replacement = f"""const sounds = {{
                    mine_click: 'data:audio/wav;base64,{click_b64}',
                    mine_lose: 'data:audio/wav;base64,{lose_b64}',"""
                    
    if 'mine_click' not in content:
        content = content.replace('const sounds = {', replacement)
        
        with open('shared/system.js', 'w', encoding='utf-8') as f:
            f.write(content)
        print('Patched system.js')
    else:
        print('Already patched.')
except Exception as e:
    print(f'Error: {e}')
