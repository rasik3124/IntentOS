#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{Manager};
use tauri_plugin_global_shortcut::GlobalShortcutExt;

fn main() {
  tauri::Builder::default()
    .plugin(tauri_plugin_global_shortcut::init())
    .setup(|app| {
      let window = app.get_webview_window("main").unwrap();
      let handle = app.handle();

      handle.global_shortcut().register("Ctrl+Space", move || {
        if window.is_visible().unwrap() {
          window.hide().unwrap();
        } else {
          window.show().unwrap();
          window.set_focus().unwrap();
        }
      }).unwrap();

      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}