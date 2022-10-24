const url = "https://osakitsukiko.github.io/hatsune-config";
let config;

window.onload = function () {
    window_manager_init();
    wm_load_screen("loading");

    try {
        config = httpGet(url + "/config.json");
        config = JSON.parse(config);
        console.log(config);
    } catch (err) {
        document.getElementById("loading-screen-title").innerHTML = "ERROR 404<br>---<br>CONF FILE NOT FOUND";
        return;
    }

    document.getElementById("desktop-background").style.backgroundImage = "url(\"" + config.wallpaper.url + "\")";
    document.getElementById("desktop-background").style.backgroundPosition = config.wallpaper.position;
    wm_load_screen("desktop");
}