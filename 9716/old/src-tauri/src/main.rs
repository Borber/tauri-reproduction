#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod resp;
mod setup;
mod window;

#[tauri::command]
async fn greet(name: String) -> String {
    format!("Hello, {}!", name)
}

#[tokio::main]
async fn main() {
    tauri::Builder::default()
        .setup(setup::handler)
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
