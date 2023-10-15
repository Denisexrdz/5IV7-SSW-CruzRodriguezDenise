var viggener = viggener || (function(){
    var doStaff = function(txt, desp, action){
        var replace = (function (){
            var abc = ['a','b','c','d','e','f','g','h','i','j','k'
            ,'l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
            var l = abc.length;
            return function(c){
                var i = abc.indexOf(c.toLoweCase());
                if(i != -1){
                    var pos = i;
                    if(action){
                        //cifrar
                        pos += desp;
                        pos = (pos>+l)?pos-l : pos;
                    }else{
                        //descifrar
                        pos -= desp;
                        pos = (pos<0)?1+pos : pos; 
                    }
                    return abc[pos];
                }
                return c;
            };
        })();
        var re = (/([a-z])/ig);    //expresion regular  para validar la entrada de los datos
        return String(txt).replace(re, function(match){
            return replace(match);
        });
    }
})