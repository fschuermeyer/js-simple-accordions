/**
 *  Accordion Plugin Felix Schürmeyer
 */
function accordion(settings){

    var standard = {
        select : 'acc',
        head : 'acc_head',
        body : 'acc_body',
        openfirst : false,
        time: '0.3',
        close: true
    }
    var acc_set = extend(standard, settings);

    var acc = document.getElementsByClassName(acc_set.select);

    for(i = 0; i < acc.length; i++){
        var accHead = acc[i].getElementsByClassName(acc_set.head);

        acc[i].style.overflow = 'hidden';
        
        if(accHead.length === 1){

            var accBody = accHead[0].nextElementSibling;
            
            accBody.style.height= '0';
            accBody.style.display= 'block';
            accBody.style.padding= '1px 1.9rem';
        
            accBody.style.transition= 'all '+ acc_set.time +'s ease-in-out';

            if(i === 0 && acc_set.openfirst){
                acc[i].classList.add('is-open');
                accBody.style.height= 'auto';       
                accBody.style.padding= '1.9rem';   
            }
                   
            accHead[0].addEventListener('click', function(){
                var accBody = this.nextElementSibling;
                var parent = this.parentElement;

                if(acc_set.close){ // Define that another there not Clicked Closed
                    var check = true;
                    var elms = document.getElementsByClassName(acc_set.select);
                    for(b = 0; b < elms.length; b++){
                                            
                        var d_body = elms[b].getElementsByClassName(acc_set.body);
                        console.log(accBody);

                        if (elms[b].classList.contains('is-open') && elms[b] != parent){  
                            console.log('PARENT');
                            d_body[0].style.height= '0';
                            elms[b].classList.remove('is-open');  
                            d_body[0].style.padding= '1px 1.9rem';
                        }else{
                
                            if(check){
                                if(accBody.style.height == 'auto'){
                                    accBody.style.height= '0';
                                    parent.classList.remove('is-open');       
                                    accBody.style.padding= '1px 1.9rem'; 
                                    check = false; 
                                    console.log('WELT');
                                }else{
                                    accBody.style.height= 'auto';
                                    parent.classList.add('is-open');       
                                    accBody.style.padding= '1.9rem';  
                                    check = false;
                                }    
                                
                                check = false;
                            }
                        }        
                    }

                }
 
                if(!acc_set.close){
                    if(accBody.style.height == 'auto'){
                        accBody.style.height= '0';
                        parent.classList.remove('is-open');  
                        accBody.style.padding= '1px 1.9rem';
          
                    }else{
                        accBody.style.height= 'auto';
                        parent.classList.add('is-open');       
                        accBody.style.padding= '1.9rem';         
                    }
                }

            })

        }else{
            console.error('To many Heads only Once. You have ' + accHead.length)
            break;
        }
    }
}


function extend(obj, src) {
Object.keys(src).forEach(function(key) { obj[key] = src[key]; });
return obj;
}

document.addEventListener('DOMContentLoaded',function(){ // DOM Ready



    accordion({
        close: true, //  Only one Open Accordion
        openfirst: true, // On Reload open the first Accordion
        time: '0.3' // set The time for open/close accordion
    });


}, false)

