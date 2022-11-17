exports.setType = (type) => {
    switch (parseInt(type)) {
        case 1:
            return "Acción";

        case 2:
            return "Terror";

        case 3:
            return "Comedia";

        case 4:
            return "Suspenso";

        case 5:
            return "Documentales";
    }
}

exports.movieActive=(active,section)=>{
    if (active){
        if(section==1){
            return "border-dark";
        }
    }else{
        if (section==1) {
            return "border-secondary";
        } else {
            return "text-secondary fst-italic";
        }
    }
}