(function () {
    const OTHER_ROOM_FILTER_ID = '-1';

    var room_filters = JSON.parse(localStorage.getItem('room_filters') || '[{}]');
    room_filters = {
        '1' : {
            name : 'test',
            room_ids : [
                7125895
            ]
        },
        '-1' : {
            name : 'other',
            room_ids : []
        }
    }

    function setRoomFilters(new_room_filters) {
        localStorage.setItem('room_filers',JSON.stringify(new_room_filters));
    }

    function get_rooms() {
        var $raw_rooms = $('#_roomListItems');

        var rooms = new Array();
        jQuery.each(room_filters, function(room_filter_id, category) {
            if (room_filter_id !== OTHER_ROOM_FILTER_ID) {
                category['room_ids'].forEach(function(room_id) {
                    $found_room = $raw_rooms.find('li._roomLink._room[data-rid=' + room_id + ']');
                    if ($found_room[0]) {
                        // add elements
                        $found_room
                        .addClass("draggable")
                        .addClass("droppable")
                        .attr("room-filter-id", room_filter_id);
                    }
                    rooms[room_filter_id] = {
                        //incomplete : incomplete,
                        jq_object : $found_room
                    };
                });
            } else {
                var $other_rooms = $raw_rooms.find('li._roomLink._room').filter(function() {
                    return $(this).attr('room-filter-id') === undefined;
                });
                if ($other_rooms[0]) {
                    // add elements
                    $other_rooms
                    .addClass("draggable")
                    .addClass("droppable")
                    .attr("room-filter-id", room_filter_id);
                }
                rooms[OTHER_ROOM_FILTER_ID] = {
                    //incomplete : incomplete,
                    jq_object : $other_rooms
                };
            }
        });

        console.log(rooms);
        return rooms;
    }

    setTimeout(get_rooms,3000);
})();

