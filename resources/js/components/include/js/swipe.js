/**
 * @borrows https://stackoverflow.com/questions/2264072/detect-a-finger-swipe-through-javascript-on-the-iphone-and-android
 */
module.exports = {
    detect: (callback) => {
        var handleSwipe = callback;

        var xDown = null;                                                        
        var yDown = null;
        var swipeDetect = 'NONE';
        var swipeDiff = 0;
        const minDiff = 100;

        document.addEventListener('touchstart', function(evt) {
            const firstTouch = (evt.touches || evt.originalEvent.touches)[0];                                      
            xDown = firstTouch.clientX;                                      
            yDown = firstTouch.clientY;    
        }, {
            passive: true
        });      

        document.addEventListener('touchmove', function(evt) {
            if ( ! xDown || ! yDown ) {
                return;
            }
        
            var xUp = evt.touches[0].clientX;                                    
            var yUp = evt.touches[0].clientY;
        
            var xDiff = xDown - xUp;
            var yDiff = yDown - yUp;
        
            if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
                if ( xDiff > 0 ) {
                    /* left swipe */ 
                    swipeDetect = 'LEFT';
                } else {
                    /* right swipe */
                    swipeDetect = 'RIGHT';
                }     
                swipeDiff = xDiff;                  
            } else {
                if ( yDiff > 0 ) {
                    /* up swipe */ 
                    swipeDetect = 'UP';
                } else { 
                    /* down swipe */
                    swipeDetect = 'DOWN';
                }    
                swipeDiff = yDiff;                                                             
            }
        }, {
            passive: true
        }); 

        document.addEventListener('touchend', function() {
            if( swipeDetect == 'RIGHT' && swipeDiff < -minDiff )
                handleSwipe('RIGHT');

            // Reset Value
            xDown = null;
            yDown = null; 
            swipeDetect = 'NONE';
            swipeDiff = 0;
        }, {
            passive: true
        }); 
    }
}