[0;1;32m●[0m apache2.service - The Apache HTTP Server
     Loaded: loaded (/lib/systemd/system/apache2.service; enabled; vendor preset: enabled)
     Active: [0;1;32mactive (running)[0m since Tue 2025-07-29 00:29:39 UTC; 6s ago
       Docs: https://httpd.apache.org/docs/2.4/
    Process: 239167 ExecStart=/usr/sbin/apachectl start (code=exited, status=0/SUCCESS)
   Main PID: 239171 (apache2)
      Tasks: 6 (limit: 4565)
     Memory: 11.5M
        CPU: 42ms
     CGroup: /system.slice/apache2.service
             ├─239171 /usr/sbin/apache2 -k start
             ├─239172 /usr/sbin/apache2 -k start
             ├─239173 /usr/sbin/apache2 -k start
             ├─239174 /usr/sbin/apache2 -k start
             ├─239175 /usr/sbin/apache2 -k start
             └─239176 /usr/sbin/apache2 -k start

Jul 29 00:29:39 susana systemd[1]: Starting The Apache HTTP Server...
Jul 29 00:29:39 susana apachectl[239170]: [Tue Jul 29 00:29:39.863857 2025] [so:warn] [pid 239170] AH01574: module php_module is already loaded, skipping
Jul 29 00:29:39 susana apachectl[239170]: AH00558: apache2: Could not reliably determine the server's fully qualified domain name, using 146.71.77.169. Set the 'ServerName' directive globally to suppress this message
Jul 29 00:29:39 susana systemd[1]: Ststored The Apache HTTP Server.
