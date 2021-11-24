# #!/bin/sh

# git_username="abbasam"
# git_password="32542244"
# git_address="gitea.inolinx.com/afarine/inolinx-site.git"

# dev_username="dev"
# dev_ip="45.147.77.173"
# dev_password="dev@InoLinx"
# dev_port="34522"
# dev_project_git_address="/home/dev/inolinx-dev/frontend/inolinx-site/frontEnd"

# # Local COMMANDs
# ng build --prod
# git add -A
# git commit -m 'add builded project'
# git push -u http://${git_username}:${git_password}@${git_address} frontend

# # Server COMMANDs
# sshpass -p ${dev_password} ssh -p ${dev_port} $dev_username@$dev_ip "
#     cd /var/www/html/;
#     rm -rf *;
#     exit;
# "

cd dist/inolinx;
scp -P 34522 -r * dev@45.147.77.173:/var/www/html;
cd ../..;