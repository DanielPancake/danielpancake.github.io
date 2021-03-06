if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    const colourChangers = Array.from(document.getElementsByClassName("colourChanger")).reverse();
    const appleThemeColor = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    
    var positionLast = 0;
    var tick = false;

    function changeColour(position) {
        for (let colourChanger of colourChangers) {
            if (position> colourChanger.offsetTop - 10) {
                let colour = colourChanger.dataset.colour;

                metaThemeColor.setAttribute("content", colour);
                appleThemeColor.setAttribute("content", colour);
                break;
            }
        }
    }

    window.onscroll = () => {
        positionLast = window.scrollY;

        if (!tick) {
            window.requestAnimationFrame(() => {
                changeColour(positionLast);
                tick = false;
            });

            tick = true;
        }
    };
}