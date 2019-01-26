"use strict"

const loader = function (callback, fileNames) {
    let itemsLoaded = 0
    let itemsToLoad = 0
    let assets = {}

    for (let name of fileNames) {
        assets[name] = loadImage(`/client/${name}.png`)
    }

    function loadImage(name)
    {
        itemsToLoad++;
        var image = new Image();
        image.onload = function () {
            itemHasLoaded(name);
        }
        image.src = name;
        return image;
    }

    function itemHasLoaded(name) {
        console.log("loaded " + name);
        itemsLoaded++;
        if (itemsLoaded === itemsToLoad) {
            allItemsHaveLoaded();
        }
    }

    function allItemsHaveLoaded() {
        console.log("all " + itemsToLoad + " items have loaded");
        callback(assets);
    }
}


function getEl (element) {
    return document.querySelector("." + element);
}
