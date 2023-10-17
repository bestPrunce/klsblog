export default  function(width: Number = 16, height: Number = 16, fill: String = '#FAFAFA', display: String = 'inline-block') {
    return `
        <svg style="display: ${display};" t="1697520251501" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13967" width="${width}"" height="${height}">
            <path d="M88.064 27.648l77.824 871.424L512 996.352l346.112-97.28 77.824-871.424z" fill="#2196F3" p-id="13968"></path><path d="M771.072 312.32l-10.24 109.568-29.696 328.704L512 811.008l-220.16-60.416-14.336-172.032h107.52l7.168 89.088L512 700.416l119.808-32.768 16.384-148.48-375.808 1.024-11.264-101.376 395.264-4.096 8.192-108.544-413.696 1.024-7.168-101.376h536.576z" fill="${fill}" p-id="13969"></path>
        </svg>
    `
}