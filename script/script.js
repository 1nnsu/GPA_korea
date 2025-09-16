document.addEventListener("DOMContentLoaded", function(e){
    scrollTopBtn();
    countWrap();
    countingNumberHandler()
})

const scrollTopBtn = () => {

    // Lenis 초기화
    const lenis = new Lenis({
        duration: 2.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(10, -10 * t)),
        });

        function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    
    // 스크롤 최상단으로 이동
    document.querySelector(".topBtn").addEventListener("click", () => {
      lenis.scrollTo(0, {
        offset: 0,   // 추가 여백
        immediate: false, // true면 애니메이션 없이 바로 이동
      });
    });
}

// 카운트1
const countWrap = () => {
    $('.counting').each(function() {
        var $this = $(this),
            countTo = $this.attr('data-count');

        $({ countNum: $this.text() }).animate(
            { countNum: countTo },
            {
                duration: 2000,
                easing: 'linear',
                step: function() {
                    $this.text(Math.floor(this.countNum).toLocaleString());
                },
                complete: function() {
                    $this.text(Number(this.countNum).toLocaleString());
                }
            }
        );
    });

    
}
// 카운트 그 섹션 도달하면 실행
const countingNumberHandler = () => {
    const countList = document.querySelector('.sec4_2');
    const numbers = document.querySelectorAll('.sec4_2 .counting');
    const duration = 1; // Duration in seconds
    if(countList){
        // Function to reset numbers to 0
        function resetNumbers() {
            numbers.forEach(number => {
                number.textContent = '0';
            });
        }

        // Function to format numbers with commas
        function formatNumber(num) {
            return num.toLocaleString();
        }

        // Function to animate counting
        function animateCount() {
            numbers.forEach(number => {
                const target = +number.getAttribute('data-count');
                const increment = target / (duration * 60); // 60 frames per second
                let current = 0;

                function updateCount() {
                    current += increment;
                    if (current < target) {
                        number.textContent = formatNumber(Math.ceil(current));
                        requestAnimationFrame(updateCount);
                    } else {
                        number.textContent = formatNumber(target);
                    }
                }
                updateCount();
            });
        }

        // Intersection Observer to detect visibility
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    countList.classList.add('on');
                    animateCount();
                } else {
                    countList.classList.remove('on');
                    resetNumbers();
                }
            });
        }, {
            threshold: 0.5 // Adjust threshold as needed
        });
        observer.observe(countList);
    }
}



