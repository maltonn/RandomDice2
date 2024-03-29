animation_id_lst = ['OUT', 'IN', 'BOX', 'curtain', 'chara']


url_params = {}
location.search.substring(1).split('&').forEach(function (item) {
    var key = item.split('=')[0]
    var value = item.split('=')[1]
    url_params[key] = value
})

function PlayAnimation() {
    for (let i = 0; i < animation_id_lst.length; i++) {
        document.getElementById(animation_id_lst[i]).style.animationPlayState = 'running'
    }
}
function PouseAnimation() {
    for (let i = 0; i < animation_id_lst.length; i++) {
        document.getElementById(animation_id_lst[i]).style.animationPlayState = 'paused'
    }
}

PouseAnimation()

if (url_params['range']) {
    tmp = decodeURI(url_params['range']).split(',')
    election_box = Array.from({ length: tmp[1] - tmp[0] + 1 }, (v, k) => "" + (Number(tmp[0]) + k));
}
else if (url_params['e']) {
    election_box = decodeURI(url_params['e']).split(',')
} else {
    election_box = 'あいうえおかがきぎくぐけげこごさざしじすずせぜそぞただちぢつづてでとどなにぬねのはひふへほまみむめもやゆよらりるれろわ'
}
console.log(election_box)

sound1 = new Audio('sound/sound1.mp3')
sound2 = new Audio('sound/sound2.mp3')



if (url_params['skip'] == "true") {
    chara=document.getElementById('chara')
    chara.style.opacity="1"
    chara.style.transitionDuration="1s"
    chara.style.transform="translateY(0)"
    
    curtain = document.getElementById('curtain')
    curtain.style.transform = "scale(1)"
    
    let F = () => {
        random_chara = election_box[Math.floor(Math.random() * election_box.length)]
        chara.innerText = random_chara
        chara.style.fontSize = 240 / random_chara.length + 'px'
        chara.style.display="flex"
    }

    curtain.addEventListener('click', () => {
        F()
    })
    document.addEventListener('keydown',(e)=>{
        console.log(e.key)
        if(e.key=="Enter"){
            F()
        }
    })

} else {
    let F = () => {
        PlayAnimation()
        setTimeout(() => {
            PouseAnimation()
        }, 10 * 1000)
        if (url_params['sound'] == "true") {
            sound1.play()
            setTimeout(() => {
                sound1.pause()
                sound1.currentTime = 0
                sound2.play()
            }, 4.1 * 1000)
        }
        random_chara = election_box[Math.floor(Math.random() * election_box.length)]
        chara.innerText = random_chara
        chara.style.fontSize = 240 / random_chara.length + 'px'
    }
    document.getElementById('BOX').addEventListener('click', () => {
        F()
    })
    document.addEventListener('keydown',(e)=>{
        if(e.key=="Enter"){
            F()
        }
    })


}



