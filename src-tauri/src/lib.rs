use serde::Serialize;
use std::fs;
use std::io;

#[tauri::command]
fn read_file(path: String) -> Result<Vec<u8>, String> {
    match fs::read(&path) {
        Ok(data) => Ok(data), // Return the binary data as Vec<u8>
        Err(err) => {
            eprintln!("Failed to read file: {}", err); // Log the error for debugging
                                                       // Map the error to a user-friendly message
            let error_message = match err.kind() {
                io::ErrorKind::NotFound => "File not found".to_string(),
                io::ErrorKind::PermissionDenied => "Permission denied".to_string(),
                _ => "An unexpected error occurred".to_string(),
            };
            Err(error_message)
        }
    }
}

#[derive(Serialize)]
struct FileInfo {
    name: String,
    is_dir: bool,
}

#[tauri::command]
fn read_dir(path: String) -> Result<Vec<FileInfo>, String> {
    match fs::read_dir(&path) {
        Ok(entries) => {
            let mut files = Vec::new();
            for entry in entries {
                match entry {
                    Ok(e) => {
                        let file_name = e.file_name().into_string().unwrap_or_default();
                        let is_dir = e.metadata().map(|m| m.is_dir()).unwrap_or(false);
                        files.push(FileInfo {
                            name: file_name,
                            is_dir,
                        });
                    }
                    Err(err) => eprintln!("Failed to read an entry: {}", err),
                }
            }
            Ok(files)
        }
        Err(err) => {
            eprintln!("Failed to read directory: {}", err);
            Err(format!("Error reading directory: {}", err))
        }
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![read_dir, read_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
