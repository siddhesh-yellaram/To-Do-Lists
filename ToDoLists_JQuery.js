//Task 1
$("input[type='text']").keypress(function (event) {
    if (event.which === 13) {
        var todoText = $(this).val();
        if (todoText !== "") {
            $(this).val("");
            //Append li in ul when user presses enter
            $("ul").append("<li class='addItem'>" + todoText + " <button>Click To Delete</button></li>");
            //Task 3
            //Arrange in LIFO Order
            $('ul').append($('ul').find('li').get().reverse());
            SaveData(todoText);
        } else {
            alert("Please Enter Some Text!!!");
        }
    }
});

//Task 2
//Button function to delete ul
$("ul").on("click", "button", function (event) {
    $(this).parent().fadeOut(500, function () {
        $(this).hide();
    });
    event.stopPropagation();
});

//Task 4
//Get List of Li's in Ul
var toDoList = [];
function SaveData(data) {
    var receiveddata = JSON.stringify(data);
    toDoList.push(data);
    localStorage.setItem('Items', JSON.stringify(toDoList));
}
