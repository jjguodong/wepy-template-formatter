# wepy-template-formatter for vscode

## Features

Beautify template region only in wepy files.


## Usage

1. Keyboard Shortcut: `ctrl+shift+alt+f` ;
2. Open context menu in vue, choose `Beautify Wepy Template` ;
3. Press `F1`, search `Beautify Wepy Template`, and click the item.


## Keyboard Shortcut

Use the following to embed a beautify shortcut in keybindings.json. Replace with your preferred key bindings.

```json
    {
      "key": "ctrl+shift+alt+f",          
      "command": "wepy-template-formatter.format",
      "when": "resourceLangId=='vue' && editorTextFocus && editorTextFocus && !editorReadonly" 
    }
```

## Github
[https://github.com/jjguodong/wepy-template-formatter](https://github.com/jjguodong/wepy-template-formatter)
