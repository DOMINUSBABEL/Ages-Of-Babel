#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::{Manager, Window};

#[cfg(target_os = "windows")]
use winapi::um::winuser::{GetWindowLongPtrW, SetWindowLongPtrW, GWL_EXSTYLE, WS_EX_TRANSPARENT, WS_EX_LAYERED, HWND_TOPMOST, SetWindowPos, SWP_NOSIZE, SWP_NOMOVE, SWP_SHOWWINDOW};

// Comando para activar/desactivar click-through nativo en Windows
#[tauri::command]
fn set_click_through(window: Window, enabled: bool) {
  #[cfg(target_os = "windows")]
  {
    if let Ok(hwnd) = window.hwnd() {
      let hwnd = hwnd as winapi::shared::windef::HWND;
      unsafe {
        let mut ex_style = GetWindowLongPtrW(hwnd, GWL_EXSTYLE);
        if enabled {
          // WS_EX_TRANSPARENT hace la ventana invisible al ratón, {forward: true} nativo
          ex_style |= (WS_EX_TRANSPARENT | WS_EX_LAYERED) as isize;
        } else {
          ex_style &= !((WS_EX_TRANSPARENT | WS_EX_LAYERED) as isize);
        }
        SetWindowLongPtrW(hwnd, GWL_EXSTYLE, ex_style);
      }
    }
  }
  #[cfg(not(target_os = "windows"))]
  {
    let _ = window;
    let _ = enabled;
    println!("Click-through solo está soportado de forma nativa en Windows.");
  }
}

// Comando para fijar ventana siempre visible arriba
#[tauri::command]
fn set_always_on_top(window: Window, enabled: bool) {
  #[cfg(target_os = "windows")]
  {
    if let Ok(hwnd) = window.hwnd() {
      let hwnd = hwnd as winapi::shared::windef::HWND;
      unsafe {
        let z_order = if enabled { HWND_TOPMOST } else { std::ptr::null_mut() };
        SetWindowPos(hwnd, z_order, 0, 0, 0, 0, SWP_NOSIZE | SWP_NOMOVE | SWP_SHOWWINDOW);
      }
    }
  }
  #[cfg(not(target_os = "windows"))]
  {
    let _ = window;
    let _ = enabled;
  }
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![set_click_through, set_always_on_top])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
