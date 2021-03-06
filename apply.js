// This module defines a function which applies a set of operations which span a
// document, to that document. The resulting document is returned.


/*jslint onevar: true, undef: true, eqeqeq: true, bitwise: true,
  newcap: true, immed: true, nomen: false, white: false, plusplus: false,
  laxbreak: true */

/*global define */

define(["./operations"], function (operations) {
    return function (ops, doc) {
        var i,
            len,
            index = 0,
            newDoc = "";
        for ( i = 0, len = ops.length; i < len; i += 1 ) {
            switch ( operations.type(ops[i]) ) {
            case "retain":
                newDoc += doc.slice(0, operations.val(ops[i]));
                doc = doc.slice(operations.val(ops[i]));
                break;
            case "insert":
                newDoc += operations.val(ops[i]);
                break;
            case "delete":
                if ( doc.indexOf(operations.val(ops[i])) !== 0 ) {
                    throw new TypeError("Expected '" + operations.val(ops[i])
                                        + "' to delete, found '" + doc.slice(0, 10)
                                        + "...'");
                } else {
                    doc = doc.slice(operations.val(ops[i]).length);
                    break;
                }
            default:
                throw new TypeError("Unknown operation: "
                                    + operations.type(ops[i]));
            }
        }
        return newDoc;
    }
});