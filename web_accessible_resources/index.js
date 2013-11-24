(function () {
    const OTHER_ROOM_FILTER_ID = '-1';

    var room_filters = JSON.parse(localStorage.getItem('room_filters') || '[{}]');
    room_filters = {
        '1' : {
            name : 'test',
            room_ids : [
                7125895,
                16074837
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

    function overwriteRoomListItems() {
        // overwrite all rooms
        $('#_roomListItems li._roomLink._room')
            .addClass("draggable")
            .addClass("droppable");

        // overwrite filtering rooms
        jQuery.each(room_filters, function(room_filter_id, category) {
            if (room_filter_id === OTHER_ROOM_FILTER_ID) {
                return;
            }
            category['room_ids'].forEach(function(room_id) {
                $('#_roomListItems li._roomLink._room[data-rid=' + room_id + ']')
                    .attr("room-filter-id", room_filter_id);
            });
        });

        // overwrite other rooms
        $('#_roomListItems li._roomLink._room')
            .filter(function() {
                return $(this).attr('room-filter-id') === undefined;})
            .attr("room-filter-id", OTHER_ROOM_FILTER_ID);
    }

    function makeRoomListHeader($rooms) {
        return '<li></li>';
    }

    function resetRoomListItems() {
        jQuery.each(room_filters, function(room_filter_id, category) {
            $rooms = $('#_roomListItems li._roomLink._room[room-filter-id=' + room_filter_id + ']');
            $header = makeRoomListHeader($rooms);
            $('#_roomListItems').prepend($rooms);
            $('#_roomListItems').prepend($header);
        });
    }

    function main() {
        overwriteRoomListItems();
        resetRoomListItems();
    }

    setTimeout(main,5000);
})();

