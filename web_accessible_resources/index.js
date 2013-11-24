(function () {
    const OTHER_ROOM_FILTER_ORDER = -1;

    var room_filters = JSON.parse(localStorage.getItem('room_filters') || '[{}]');
    room_filters = [
        {
            order : 1,
            name : 'test',
            room_ids : [
                7125895,
                16074837
            ]
        },
        {
            order : 2,
            name : 'test',
            room_ids : [
                7064389
            ]
        },
        {
            order : -1,
            name : 'other',
            room_ids : []
        }
    ]

    function setRoomFilters(new_room_filters) {
        localStorage.setItem('room_filers',JSON.stringify(new_room_filters));
    }

    function overwriteRoomListItems() {
        // overwrite all rooms
        $('#_roomListItems li._roomLink._room')
            .addClass("draggable")
            .addClass("droppable");

        // overwrite filtering rooms
        room_filters.forEach(function(room_filter) {
            var room_filter_order = room_filter['order'];
            if (room_filter_order === OTHER_ROOM_FILTER_ORDER) {
                return;
            }
            room_filter['room_ids'].forEach(function(room_id) {
                $('#_roomListItems li._roomLink._room[data-rid=' + room_id + ']')
                    .attr("room-filter-order", room_filter_order);
            });
        });

        // overwrite other rooms
        $('#_roomListItems li._roomLink._room')
            .filter(function() {
                return $(this).attr('room-filter-order') === undefined;})
            .attr("room-filter-order", OTHER_ROOM_FILTER_ORDER);
    }

    function sortRoomListItems(asc) {
        if (asc === undefined) {
            asc = true;
        }

        room_filters.sort(function(a, b) {
            console.log(a.order + ' < ' + b.order);
            if (a.order === OTHER_ROOM_FILTER_ORDER) {
                return false;
            }
            if (b.order === OTHER_ROOM_FILTER_ORDER) {
                return true;
            }

            if (asc) {
                return a.order < b.order;
            } else {
                return a.order > b.order;
            }
        });
    }

    function makeRoomListHeader(room_filter_order, $rooms) {
        return $('<li/>')
            .attr('id', 'room-filter-header-' + room_filter_order)
            .attr('room-filter-order', room_filter_order);
    }

    function resetRoomListItems() {
        sortRoomListItems();
        room_filters.forEach(function(room_filter) {
            var room_filter_order = room_filter['order'];
            var $rooms = $('#_roomListItems li._roomLink._room[room-filter-order=' + room_filter_order + ']');
            var $header = makeRoomListHeader(room_filter_order, $rooms);

            $rooms.remove();
            $('#room-filter-header-' + room_filter_order).remove();
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

