use tauri::App;

use crate::window;

pub fn handler(app: &mut App) -> Result<(), Box<dyn std::error::Error>> {
    let handle = app.handle();

    // 初始化窗口
    // Initialize the window
    window::main(handle);

    // 初始化托盘
    // Initialize the tray
    // tray::init(handle)?;

    Ok(())
}
