document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".section");
    const navItems = document.querySelectorAll(".nav-item");
    let currentIdx = 0;
    let isScrolling = false;

    const projectData = {
        p1: {
            tag: "Real-time Chat Platform",
            title: "Ananas Talk",
            period: "2025.05.26 - 2025.06.26 (1개월)",
            desc: "Socket.IO 기반의 실시간 채팅 플랫폼으로, 사용자는 프로필 설정, AI 스토리 및 프로필 기능을 제공합니다. OpenAI API를 활용한 AI 도우미 기능과 Firebase 실시간 데이터베이스를 통해 안정적인 채팅 환경을 제공합니다.",
            tech: "React, TypeScript, Tailwind CSS, Firebase, Socket.IO, OpenAI API",
            image: "./image/Ananastalk.png",
            link: "https://github.com/lsjin0322/Ananas-talk",
            deploy: "https://ananas-talk.onrender.com"
        },
        p2: {
            tag: "2D Indie Game",
            title: "은방울의 모험 2",
            period: "2025.05.26 - 2025.06.02 (약 1주일)",
            desc: "신비한 계곡의 요정 은방울을 조종하여 모험을 떠나는 웹 기반 2D 사이드스크롤 게임입니다. 픽셀 아트 그래픽과 매력적인 스토리텔링으로 게이머에게 감정적인 연결고리를 만들어내는 인디 게임 프로토타입입니다.",
            tech: "HTML5, CSS3, JavaScript, Canvas API, LocalStorage",
            image: "./image/game.png",
            link: "https://github.com/lsjin0322/web/blob/master/%EC%9D%80%EB%B0%A9%EC%9A%B8/READEM.md",
            deploy: "https://web-9a7o.vercel.app/"
        },
        p3: {
            tag: "Computer Vision - Hand Gesture",
            title: "Fingerpoint Detection",
            period: "개발 기간 미정",
            desc: "OpenCV와 MediaPipe를 활용하여 손가락 포인트를 실시간으로 감지하고 추적하는 컴퓨터 비전 프로젝트입니다. 카메라 입력을 받아 정밀한 손가락 좌표를 감지하고 이를 활용한 인터랙티브 애플리케이션 개발에 활용됩니다.",
            tech: "Python, OpenCV, MediaPipe, Real-time Detection",
            image: "./image/cv.png",
            link: "https://github.com/lsjin0322/opencv-vision-lab/tree/main/fingerpoint"
        },
        p4: {
            tag: "AI-based Family Wellbeing",
            title: "LOOPI",
            period: "2025.07.13 - 진행 중",
            desc: "1인 가구와 고령화 사회의 고립 문제를 해결하기 위한 AI 기반 안부 확인 플랫폼입니다. 스마트폰의 활동 데이터(가동시간, 가속도 센서 등)를 분석하여 사용자의 일상 패턴을 학습하고, 이상 징후를 실시간으로 탐지합니다. CCTV 대신 비침해적인 활동 기반 모니터링으로 사생활을 보호하면서도, 가족 간의 따뜻한 전화나 문자를 유도하는 심리적 가이드를 제공합니다. 모든 세대가 쉽게 사용할 수 있습니다.",
            tech: "React Native, AI/ML, Activity Tracking, Firebase, Real-time Alerts",
            image: "./image/Loopi.png",
            link: "https://github.com/lsjin0322"
        }
    };

    function changeSection(index) {
        if (index < 0 || index >= sections.length) return;
        
        isScrolling = true;
        currentIdx = index;

        sections.forEach((sec, i) => {
            if (i === currentIdx) {
                sec.classList.add("active");
            } else {
                sec.classList.remove("active");
            }
        });

        navItems.forEach((item, i) => {
            if (i === currentIdx) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });

        setTimeout(() => {
            isScrolling = false;
        }, 1200);
    }

    window.addEventListener("wheel", (e) => {
        if (isScrolling) return;
        if (e.deltaY > 0) {
            if (currentIdx < sections.length - 1) changeSection(currentIdx + 1);
        } else {
            if (currentIdx > 0) changeSection(currentIdx - 1);
        }
    }, { passive: true });

    navItems.forEach((item) => {
        item.addEventListener("click", () => {
            if (isScrolling) return;
            const targetIdx = parseInt(item.getAttribute("data-section"), 10);
            changeSection(targetIdx);
        });
    });

    const clickTargets = document.querySelectorAll("[data-target]");
    clickTargets.forEach(target => {
        target.addEventListener("click", (e) => {
            e.stopPropagation();
            if (isScrolling) return;
            const targetIdx = parseInt(target.getAttribute("data-target"), 10);
            changeSection(targetIdx);
        });
    });

    const bubbles = document.querySelectorAll(".bubble");
    bubbles.forEach(bubble => {
        bubble.addEventListener("mousemove", (e) => {
            const rect = bubble.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            bubble.style.transform = `translate3d(${x * 0.12}px, ${y * 0.12}px, 0) scale(1.04)`;
        });
        bubble.addEventListener("mouseleave", () => {
            bubble.style.transform = "";
        });
    });

    const modal = document.getElementById("projectModal");
    const modalClose = document.querySelector(".modal-close");
    const projectBubbles = document.querySelectorAll(".project-bubble");

    projectBubbles.forEach(pb => {
        pb.addEventListener("click", (e) => {
            e.stopPropagation();
            const pId = pb.getAttribute("data-project");
            const data = projectData[pId];

            if (data) {
                document.getElementById("mTag").textContent = data.tag;
                document.getElementById("mTitle").textContent = data.title;
                
                // 개발 기간 표시
                const periodElement = document.getElementById("mPeriod");
                if (periodElement && data.period) {
                    periodElement.textContent = "📅 " + data.period;
                    periodElement.style.display = "block";
                } else if (periodElement) {
                    periodElement.style.display = "none";
                }
                
                document.getElementById("mDesc").textContent = data.desc;
                document.getElementById("mTech").textContent = data.tech;
                
                // 이미지 표시 (있을 경우)
                const imageZone = document.querySelector(".modal-image-zone");
                const imageEl = document.getElementById("mImage");
                if (data.image) {
                    imageEl.src = data.image;
                    imageZone.style.display = "flex";
                } else {
                    imageZone.style.display = "none";
                }
                
                // GitHub 링크 설정
                const linkBtn = document.getElementById("mLink");
                if (data.link) {
                    linkBtn.href = data.link;
                    linkBtn.style.display = "inline-block";
                } else {
                    linkBtn.style.display = "none";
                }
                
                // 배포 주소 설정
                const deployBtn = document.getElementById("mDeploy");
                if (data.deploy) {
                    deployBtn.href = data.deploy;
                    deployBtn.style.display = "inline-block";
                } else {
                    deployBtn.style.display = "none";
                }
                
                modal.classList.add("open");
            }
        });
    });

    modalClose.addEventListener("click", () => modal.classList.remove("open"));
    modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.remove("open");
    });
    
    // 다른 곳 클릭 시 옵션 닫기
    document.addEventListener("click", () => {
        const blogOptions = document.getElementById("blogOptions");
        const emailOptions = document.getElementById("emailOptions");
        const notionOptions = document.getElementById("notionOptions");
        
        if (blogOptions && blogOptions.classList.contains("show")) {
            blogOptions.classList.remove("show");
        }
        
        if (emailOptions && emailOptions.classList.contains("show")) {
            emailOptions.classList.remove("show");
        }
        
        if (notionOptions && notionOptions.classList.contains("show")) {
            notionOptions.classList.remove("show");
        }
    });
});

// 블로그 옵션 함수
function showBlogOptions(event) {
    event.stopPropagation();
    const blogOptions = document.getElementById("blogOptions");
    blogOptions.classList.toggle("show");
}

function hideBlogOptions() {
    document.getElementById("blogOptions").classList.remove("show");
}

// 노션 옵션 함수
function showNotionOptions(event) {
    event.stopPropagation();
    const notionOptions = document.getElementById("notionOptions");
    notionOptions.classList.toggle("show");
}

function hideNotionOptions() {
    document.getElementById("notionOptions").classList.remove("show");
}

// 이메일 옵션 함수
function showEmailOptions(event) {
    event.stopPropagation();
    const emailOptions = document.getElementById("emailOptions");
    emailOptions.classList.toggle("show");
}

function hideEmailOptions() {
    document.getElementById("emailOptions").classList.remove("show");
}

// 이메일 복사 함수
function copyEmail(event) {
    event.stopPropagation();
    const email = "lsujin0322@naver.com";
    
    navigator.clipboard.writeText(email).then(() => {
        const feedback = document.getElementById("copyFeedback");
        feedback.style.display = "block";
        
        setTimeout(() => {
            feedback.style.display = "none";
        }, 1500);
    }).catch(err => {
        console.error("복사 실패:", err);
    });
}

// 프로필 모달 함수
function openProfileModal() {
    const profileModal = document.getElementById("profileModal");
    profileModal.classList.add("open");
    document.body.style.overflow = "hidden";
    adjustProfileModalSize();
}

function closeProfileModal() {
    const profileModal = document.getElementById("profileModal");
    profileModal.classList.remove("open");
    document.body.style.overflow = "auto";
}

// 프로필 모달 크기 동적 조정
function adjustProfileModalSize() {
    const profileModal = document.getElementById("profileModal");
    const profileContent = document.querySelector(".profile-modal-content");
    const profileImage = document.querySelector(".profile-modal-image");
    
    if (profileContent && profileImage) {
        // 윈도우 크기에 맞춰 계산
        const padding = 60;
        const availableWidth = window.innerWidth - padding;
        const availableHeight = window.innerHeight - 120;
        
        profileContent.style.width = Math.min(availableWidth, window.innerWidth) + "px";
        profileContent.style.height = Math.min(availableHeight, window.innerHeight) + "px";
        profileContent.style.maxWidth = "100%";
        profileContent.style.maxHeight = "100%";
    }
}

// 윈도우 리사이즈 시 모달 크기 조정
window.addEventListener("resize", () => {
    const profileModal = document.getElementById("profileModal");
    if (profileModal && profileModal.classList.contains("open")) {
        adjustProfileModalSize();
    }
});

// 프로필 모달 배경 클릭 시 닫기 (DOM 로드 후 추가)
document.addEventListener("DOMContentLoaded", () => {
    const profileModal = document.getElementById("profileModal");
    if (profileModal) {
        profileModal.addEventListener("click", (e) => {
            if (e.target === profileModal) {
                closeProfileModal();
            }
        });
    }
    
    // Esc 키로 모달 닫기
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && profileModal.classList.contains("open")) {
            closeProfileModal();
        }
    });
});
