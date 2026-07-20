const express = require('express');
const path = require('path');
const app = express();

// 환경변수에서 포트 읽기 (Railway는 자동으로 PORT 설정)
const PORT = process.env.PORT || 3000;

// sujin_page 폴더를 정적 파일 서빙
app.use(express.static(path.join(__dirname, 'sujin_page')));

// 루트 경로 요청 처리
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'sujin_page', 'index.html'));
});

// 모든 경로에서 index.html 반환 (SPA 방식)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'sujin_page', 'index.html'));
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Visit http://localhost:${PORT}`);
});
