$(document).ready(function(){
    let checkItems =0;
    let totalItems = $(".list-item").length;
    


    $(".add-todo").keydown(function(e){
        var code = e.keyCode || e.which;
        var value = $(this).val();
        if(code ==13){
            $(".empty").css("display","none");
            if( value != "" ){
                
                $("form").append(`<div class="list-item">
                <input type="checkbox" name="todo1" value="walk">
                <label for="todo1">${value}</label>
                <div class="delete-list-item"></div>
                  </div>`);
    
    
                //   change styling based on checked and unchecked
                $("input[type='checkbox']").last().change(function(){
                    if(this.checked) {
                        checkItems++;
                        $(".items-left").html(`${totalItems - checkItems} items left`);
                        $(this).next().css("text-decoration", "line-through");
                        $(this).next().css("color", "var(--clr-checked-unactive-text)");
                    }
                    else {
                        checkItems--;
                        $(".items-left").html(`${totalItems - checkItems} items left`);
                        $(this).next().css("text-decoration", "none");
                        $(this).next().css("color", "var(--clr-list-item-text)");
                    }
                    console.log(checkItems);
                });
    
                // handling delete item 
                $(".delete-list-item").last().click(function(){

                    $(this).parent().remove();
                    totalItems--;
                    $(".items-left").html(`${totalItems - checkItems} items left`);
                });
        
                totalItems++;
                 $(".items-left").html(`${totalItems - checkItems} items left`);
                 

            }
            
            $(this).val("");
        }
   
    });

    // setting item left 
    function itemLeft(){
        totalItems--;
        $(".items-left").html(`${totalItems - checkItems} items left`);
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
    });
    $(".all").click(function(){
        $("input[type='checkbox']").each(function(){
          
            $(this).parent().css("display","flex");
            
        });
    });

    

    $(".clear-completed").click(function(){
        $("input[type='checkbox']").each(function(){
            if(this.checked){
                $(this).parent().remove();
                totalItems--;
                $(".items-left").html(`${totalItems - checkItems} items left`);
            }
        });
    });

  


});
