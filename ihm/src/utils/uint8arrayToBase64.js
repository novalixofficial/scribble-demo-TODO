﻿export function Uint8ToString(u8a){
    var CHUNK_SZ = 0x8000;
    var c = [];
    for (var i=0; i < u8a.length; i+=CHUNK_SZ) {
        c.push(String.fromCharCode.apply(null, u8a.subarray(i, i+CHUNK_SZ)));
    }
    return c.join("");
}
/*
var u8 = new Uint8Array([65, 66, 67, 68]);
var b64encoded = btoa(Uint8ToString(u8));
*/
