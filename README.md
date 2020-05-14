# node-ws-chat

Node Web Socket chat server

Open one browser to the index.html
enter the following:
{"msgType":"Init", "referenceId":"1"}

Open another browser to the index.html
enter the following:
{"msgType":"Init", "referenceId":"2"}

Send this from first window opened
{"msgType":"Message", "fromReferenceId":"1", "toReferenceId":"2", "msg":"Hi There"}

Send this from second window opened.
{"msgType":"Message", "fromReferenceId":"2", "toReferenceId":"1", "msg":"Hi There u"}

Now you have messages to each unique referenceId

This also supports multiple clients with the same referenceId.

This works great on Web and Mobile.

Enjoy!
