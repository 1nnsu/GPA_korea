document.addEventListener("DOMContentLoaded", function(e){
    scrollTopBtn();
    countWrap();
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


