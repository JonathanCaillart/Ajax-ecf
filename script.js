// document.addEventListener("DOMContentLoaded", () => { getAllApi(); });

// function getAllApi (){
    
//     var url = "https://6057e432c3f49200173ad08d.mockapi.io/api/v1/employees"
//     var xhttp = new XMLHttpRequest();

//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status ==200){

//             var data = JSON.parse(this.responseText);
//             appendTable(data);
//         }
//     };

//     console.log(xhttp);

//     xhttp.open("GET",url);
//     xhttp.send(); 

// }



$(function (){
    var $employees = $('#employees');
    var $name = $('#name');
    var $last_name = $('#last_name');
    var $email = $('#email');
    var $job_title = $('#job_title');

    var employeeTemplate = $('#employee-template').html();

    //using mustache.js to generate a template

    function addEmployee(employee){
        $employees.append(Mustache.render(employeeTemplate, employee));
    }
    
    //making the first ajax call to the API to fetch all the employee

    $.ajax({
        type:'GET',
        url:'https://6057e432c3f49200173ad08d.mockapi.io/api/v1/employees',
        success:function(employees) {
            $.each(employees, function(i, employee){
                addEmployee(employee);
            });
        }
    });    
    
    //preparing my fields to add a new employee with key/values

    $('#add-employee').on('click', function(){

        var employee = {
            name: $name.val(),
            last_name: $last_name.val(),
            email: $email.val(),
            job_title: $job_title.val(),

        };
    //making the ajax call to add a new employee by using data --> var employee

        $.ajax({
            type:'POST',
            url:'https://6057e432c3f49200173ad08d.mockapi.io/api/v1/employees',
            data:employee,
            success: function(newEmployee){
                addEmployee(newEmployee);

            }
        });

    }) 

    // Only fire if it's part of a remove class

    $employees.delegate('.remove','click',function(){

        var $li = $(this).closest('li');

        //ajax call to the api to delete one employee by his/her id

        $.ajax({
            type:'DELETE',
            url:'https://6057e432c3f49200173ad08d.mockapi.io/api/v1/employees/' + $(this).attr('data-id'),
            success: function(){
                $li.fadeOut(300, function(){
                    $(this).remove();
                });

            }
        });
    })

    $employees.delegate('.editEmployee', 'click', function(){
        var $li = $(this).closest('li');
        $li.find('input.name').val($li.find('span.name').html() );
        $li.find('input.last_name').val($li.find('span.last_name').html() );
        $li.find('input.email').val($li.find('span.email').html() );
        $li.find('input.job_title').val($li.find('span.job_title').html() );
        $li.addClass('edit');

    });

    $employees.delegate('.cancelEdit', 'click', function(){
        $(this).closest('li').removeClass('edit');
    })   
    
    $employees.delegate('.saveEdit', 'click', function(){
        var $li = $(this).closest('li');
        var employee = {
            name: $li.find('input.name').val(),
            last_name: $li.find('input.last_name').val(),
            email: $li.find('input.email').val(),
            job_title: $li.find('input.job_title').val(),

        };

    $.ajax({
        type: 'PUT',
        url:'https://6057e432c3f49200173ad08d.mockapi.io/api/v1/employees/' + $li.attr('data-id'),
        data: employee,
        success: function(){
            $li.find('span.name').html(employee.name);
            $li.find('span.last_name').html(employee.last_name);
            $li.find('span.email').html(employee.email);
            $li.find('span.job_title').html(employee.job_title);
            $li.removeClass('edit');
        }

    })    

    });

});






