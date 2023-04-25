/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});



function pressButton(){
    let element = document.getElementById('isNumberPrime')
    let number = Number(document.querySelector('#primeNumber').value)
    element.innerHTML = millerRabin(number)
}


var global = {}
function millerRabin(n) { //we might not have to define a, as we will probable use Math.floor(Math.random(n-1)) to pick randoms values for a
    
    if(!Number.isInteger(n)){
        return 'ERROR: The input is not a integer. Please input an integer'
    }
    if(n<=0){
        return 'ERROR: The number must be a integer greater than 0'
    }
    if(n===1){
        return '[1] is NOT a prime OR composite! It must be defind this way otherwise the fundamental theorem of arithmatic does not hold! '
    }

    global.phi = n-1
    global.N = BigInt(n)
    var N = global.N

    if(!(N & 1n)){
        return 'ERROR: The number needs to be an odd number -- TRY AGAIN. '
    }

    let phiN = N-1n // We assume that n is a prime, therefore Eulers function tells us that there should be N-1 coprimes    
    var counterPhi = phiN // copying phiN into this varible so it can be devided and reassinged a value without messin up phiN
    let exponents = findExponents(counterPhi)
    var e = exponents.e
    var k = exponents.k
    
    if(createWitnesses(e, k).length === 0){
        let prime = `The number [${n}] is probably prime.`
        return prime 
    }else{
        let composite = `The number [${n}] is NOT prime.`
        return composite
    }


    //solves factorization power of 2 for n-1 since n is odd
    function findExponents(counterPhi) {
        var counter = 0
        while(true){
            if(!(counterPhi&1n)){ //if counterPhi is not odd:
                counter++
                counterPhi /= 2n 
            }else{
                break
            }
        }
        return {
            'e' : BigInt(counter),
            'k': BigInt(counterPhi)
        }
    }


    function createWitnesses(e, k){
        witnesses = []
        for(let i = 0; i < 18; i+=1){
            let coPrime = BigInt(1 + Math.floor(Math.random()*(global.phi)))
            if(createSequence(coPrime, e, k)){ 
                witnesses.push(coPrime)
                break
            }
        }
        return witnesses
    }

    function createSequence(a, e, k){
        var millerRabinSequence = []
        for(let i = 0n; i <= e - 1n; i+=1n){
            millerRabinSequence.push((BigInt(a) ** ( (2n ** i) * k)) % N)
        }
        return isWitness(millerRabinSequence)
    }


    function isWitness(millerRabinSequence) { 
        if(millerRabinSequence[0] === 1n || millerRabinSequence[0] === N-1n){
            millerRabinSequence.shift()
            if(millerRabinSequence.every(element => element === 1n)){ //works on emptry array becasue every method returns true for empty array
                return false
            }
            return true
        }
        let firstNegativeOne = millerRabinSequence.findIndex(element => element === N-1n) //after the first  -1, all other terms in sequence must be 1, since all terms after relate to this term by the power 2 to some power, i. 
        if(millerRabinSequence.splice(firstNegativeOne+1).every(element => element === 1n)){
            return false
        }
        return true
    }

}
