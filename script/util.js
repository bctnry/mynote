
function greetings() {
    var hour = new Date().getHours();
    return (
        (2 <= hour && hour <= 9)? 'Hope you have a good day :) '
        : (9 < hour && hour <= 12)? 'Keep up with your good work :)'
        : (12 < hour && hour <= 14)? 'Please, have a nice noon break :)'
        : (14 < hour && hour <= 18)? 'Keep up with your good work :)'
        : (18 < hour && hour <= 21)? 'Hope you have a good evening :)'
        : (21 < hour && hour < 24) || (0 < hour && hour <= 2)? 'Hope you have a good night :)'
        : ':)'
    );
}
