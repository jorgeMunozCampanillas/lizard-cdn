window.onload=()=>{
    const url = "http://lizardd.click/api/cdn/"
    const $f = element => document.querySelectorAll(element);

    const head = document.getElementsByTagName('head')[0];
    
    const setDependences = (dependence) => {
        let script = {};
        if (dependence.includes("script")) {
            script = document.createElement('script');
            script.type = 'text/javascript';
        }
        else{
            document.createElement('link');
            script.type = 'stylesheet';
        }

        console.log("YOO")
        console.log(script)

        /*dependence = dependence.replaceAll("<", "");
        dependence = dependence.replaceAll(">", "");
        dependence = dependence.replaceAll("/script", "");*/
        
        let attributes = dependence.split(' ');
        attributes = attributes
        .filter(at => at.match(/\w*='.*'/))
        .map(at => at.split("="));
        console.log(attributes)
        
        for (let i = 0; i < attributes.length; i++) {
            script[attributes[i][0]] = attributes[i][1].replace("'", "");
            console.log(script)
        }

        head.appendChild(script);
    } 

    const writer = (src, node) => {
        if (src.script) {
            //setDependences(src.script)
        }
        setTimeout(()=>{
            //foo()
            node.innerHTML=`
            ${src.html}
            <style>${src.css}</style>
            `;
        },1000)
    }
    
    const getComponent = (postId, node) => {
        fetch(url+postId)
        .then(res => res.json())
        .then(res => writer(res[0], node))
        .catch(err => console.log("Erorrrrrrrrrrrrr"+err));
    }
    
    const regEx = new RegExp(/lizard-\d*/);
    //Select all components with lizard-* class
    const $componenets = $f("[class*=lizard-]");
    
    //Pas nodeList to Array for iteration with map  
    const componenetsId = [...$componenets].map(comp=>{
        //Get the postId
        return comp.className.match(regEx)[0].split("-")[1];
    });

    for (let postId = 0; postId < $componenets.length; postId++) {
        getComponent(componenetsId[postId], $componenets[0])
    }
    
  
}
