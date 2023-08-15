// next prev

//show active step
function showActiveStep()
{
    if ($('#step1').is(':visible'))
    {
        $(".step-counter-inner .step-type").removeClass("active");
        $(".step-counter-inner .step-type").eq(0).addClass("active");
        $(".step-bar-inner .move-bar").css('width', '33%');
        $("#completion-rate").html("33%");
        $("#showstep").html('1');
    }
    else if ($('#step2').is(':visible'))
    {
        $(".step-counter-inner .step-type").removeClass("active");
        $(".step-counter-inner .step-type").eq(1).addClass("active");
        $(".step-bar-inner .move-bar").css('width', '67%');
        $("#completion-rate").html("67%");
        $("#showstep").html('2');
    }
    else if ($('#step3').is(':visible'))
    {
        $(".step-counter-inner .step-type").removeClass("active");
        $(".step-counter-inner .step-type").eq(2).addClass("active");
        $(".step-bar-inner .move-bar").css('width', '100%');
        $("#completion-rate").html("100%");
        $("#showstep").html('3');
    }
    else
    {
    console.log("error");
    }
}


// next prev
var divs = $('.show-section section');
var now = 0; // currently shown div
divs.hide().first().show(); // hide all divs except first

function next()
{
    divs.eq(now).hide();
    now = (now + 1 < divs.length) ? now + 1 : 0;
    divs.eq(now).show(); // show next
    showActiveStep();
}

$(".prev").click(function() {
    divs.eq(now).hide();
    now = (now > 0) ? now - 1 : divs.length - 1;
    divs.eq(now).show(); // show previous
    showActiveStep();
});



// change name when file is selected
$("#file").on('change', function(e){
    // alert("file is selected");
    var filename = e.target.files[0].name;
    $(".upload-area-inner span").text(filename);
});



// disable on enter
$('form').on('keyup keypress', function(e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) { 
      e.preventDefault();
      return false;
    }
  });
  
  

  // form validiation
var inputschecked = false;


function formvalidate(stepnumber)
{
  // check if the required fields are empty
  inputvalue = $("#step"+stepnumber+" :input").not("button").map(function()
  {
    if(this.value.length > 0)
    {
      $(this).removeClass('invalid');
      return true;

    }
    else
    {
      
      if($(this).prop('required'))
      {
        $(this).addClass('invalid');
        return false
      }
      else
      {
        return true;
      }
      
    }
  }).get();
  

  // console.log(inputvalue);

  inputschecked = inputvalue.every(Boolean);

  // console.log(inputschecked);
}

// form validiation
$(document).ready(function()
   {
        // check step1
        $("#step1btn").on('click', function()
        {
            formvalidate(2);
          {
              next();
          }
        })
        // check step2
        $("#step2btn").on('click', function()
        {
            formvalidate(2);
            
    
            if(inputschecked == false)
            {
                formvalidate(2);
            }
            else
            {
                next();
            }
        })

       $("#sub").on('click' , function()
       {
            //number validiation
            var numbers = /^[0-9]+$/;
        

            formvalidate(3);
            
    
            if(inputschecked == false)
            {
                formvalidate(3);
            }
            
            
            
            else
            {
                $("#sub").html("<img src='assets/images/loading.gif'>");
                // var attachment = {cv: $("#step3 input[type=file]").val()};
                // var dataString = $("#step1, #step2, #step3").serialize() + '&' + $.param(attachment);
                
                var dataString = new FormData(document.getElementById("steps"));


                // console.log(dataString);
                
                
            }

        });
   });

