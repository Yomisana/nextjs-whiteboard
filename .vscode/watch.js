const { exec } = require("child_process");
const chokidar = require("chokidar");

// 監聽 src 目錄的所有檔案變化
chokidar.watch("./src").on("all", (event, path) => {
  console.log(`檔案變化: ${event} - ${path}`);

  // 檔案變化後執行 npm run build
  exec("npm run build", (error, stdout, stderr) => {
    if (error) {
      console.error(`執行失敗: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`錯誤輸出: ${stderr}`);
      return;
    }
    console.log(`執行成功: ${stdout}`);
  });
});
