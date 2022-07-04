#!/bin/bash
sudo fuser -k 5000/tcp
sudo fuser -k 8000/tcp
sudo fuser -k 8880/tcp
./server &
node app.js &
python3 -m http.server &
sleep 4
a=$(fuser -n tcp 8000 2>&1 | awk -F' ' '{print $2}')
b=$(fuser -n tcp 5000 2>&1 | awk -F' ' '{print $2}')
c=$(fuser -n tcp 8880 2>&1 | awk -F' ' '{print $2}')
d="${a},${b},${c}"
export d
yq '.pid_list = env(d) ' -i ../Projects/ebpf/ebpf-tracer-config.yaml
