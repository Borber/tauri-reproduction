use tauri::AppHandle;

pub fn main(app: &AppHandle) {
    tauri::WebviewWindowBuilder::new(app, "main", tauri::WebviewUrl::App("/".into()))
        .title("KanB")
        .fullscreen(true)
        .decorations(false)
        .resizable(false)
        // .transparent(false)
        // .always_on_top(true)
        // .skip_taskbar(true)
        .visible(true)
        .shadow(false)
        .build()
        .expect("Failed to create main window");
}
