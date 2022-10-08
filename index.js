$(document).ready(function(){


    $(".add-todo").keydown(function(e){
        var code = e.keyCode || e.which;
        var value = $(this).val();
        if(code ==13){
            $(".empty").css("display","none");
            if( value != "" ){
                
                $("form").append(`<div class="list-item" draggable="true">
                <input type="checkbox" name="todo1" value="walk">
                <label for="todo1">${value}</label>
                <div class="delete-list-item"></div>
                  </div>`);
    
    
                //   change styling based on checked and unchecked
                $("input[type='checkbox']").last().change(function(){
                    if(this.checked) {
                        itemsLeft();
                        $(this).next().css("text-decoration", "line-through");
                        $(this).next().css("color", "var(--clr-checked-unactive-text)");
                    }
                    else {
                        itemsLeft();
                        $(this).next().css("text-decoration", "none");
                        $(this).next().css("color", "var(--clr-list-item-text)");
                    }
                });
    
                // handling delete item 
                $(".delete-list-item").last().click(function(){

                    
                   
                    $(this).parent().remove();
                    if($(".list-item").length == 0){
                        $(".empty").css("display","flex"); 
                    }
                    itemsLeft();
                });
        
                itemsLeft();
                 

            }
            
            $(this).val("");
        }
   
    });

    // setting items left number 
    function itemsLeft(){
        let uncheckItems = 0;
        $("input[type='checkbox']").each(function(){
            if(!this.checked) uncheckItems++;
        });

        $(".items-left").html(`${uncheckItems} items left`);
    }

    // displaying all completed tasks

    $(".completed").click(function(){
        $("input[type='checkbox']").each(function(){
            if(this.checked){
                $(this).parent().css("display","flex");
            }
            else {
                $(this).parent().css("display","none");
            }
        });
        $(".control").each(function(){
            $(this).css("color","hsl(234, 11%, 52%)");
        });
        $(this).css("color","hsl(220, 98%, 61%)");
    });
    $(".active").click(function(){
        $("input[type='checkbox']").each(function(){
            if(this.checked){
                $(this).parent().css("display","none");
            }
            else {
                $(this).parent().css("display","flex");
            }
        });
        $(".control").each(function(){
            $(this).css("color","hsl(234, 11%, 52%)");
        });
        $(this).css("color","hsl(220, 98%, 61%)");
    });
    $(".all").css("color","hsl(220, 98%, 61%)");
    $(".all").click(function(){
        $("input[type='checkbox']").each(function(){
          
            $(this).parent().css("display","flex");
            
        });
        $(".control").each(function(){
            $(this).css("color","hsl(234, 11%, 52%)");
        });
        $(this).css("color","hsl(220, 98%, 61%)");
    });

    

    $(".clear-completed").click(function(){
        $("input[type='checkbox']").each(function(){
            if(this.checked){
                $(this).parent().remove();
            }
        });
        itemsLeft();
    });

  

    var dragSrcEl = null;

    function handleDragStart(e) {
        console.log("inside drag start")
      // Target (this) element is the source node.
      dragSrcEl = this;
    
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', this.outerHTML);
    
    }
    function handleDragOver(e) {
      if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
      }

      e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
    
      return false;
    }
    

    
    
    function handleDrop(e) {
      // this/e.target is current target element.
    
      if (e.stopPropagation) {
        e.stopPropagation(); // Stops some browsers from redirecting.
      }
    
      // Don't do anything if dropping the same column we're dragging.
      if (dragSrcEl != this) {
        
        this.parentNode.removeChild(dragSrcEl);
        var dropHTML = e.dataTransfer.getData('text/html');
        this.insertAdjacentHTML('beforebegin',dropHTML);
        var dropElem = this.previousSibling;
        addDnDHandlers(dropElem);
        
      }
      return false;
    }
    
    
    function addDnDHandlers(elem) {
        console.log("inside");
      elem.addEventListener('dragstart', handleDragStart, false);
      elem.addEventListener('dragover', handleDragOver, false);
      elem.addEventListener('drop', handleDrop, false);
    }
    
    var cols = document.querySelectorAll('.list-item');
    [].forEach.call(cols, addDnDHandlers);
    
    
});


