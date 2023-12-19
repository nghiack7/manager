FROM node:16 AS frontendBuilder

# set app work dir
WORKDIR /mng

# copy assets files to the container
COPY views/ .

# set assets/ as work dir to build frontend static files
WORKDIR /mng/views
RUN npm install
RUN npm run build

FROM golang:1.21.0 AS backendBuilder

# set app work dir
WORKDIR /go/src/mng

# copy all files to the container
COPY . .

# build app executable
RUN CGO_ENABLED=1 GOOS=linux go build -o mng main.go

FROM debian

# Create a group and user deploy


ARG ROOT_DIR=/home/deploy/mng

WORKDIR ${ROOT_DIR}


# copy static assets file from frontend build
COPY --from=frontendBuilder --chown=deploy:deploy /mng/build ./views/build

# copy app and migrations executables from backend builder
COPY --from=backendBuilder --chown=deploy:deploy /go/src/mng/ .

# set user deploy as current user

# start app
CMD [ "./mng", "-env", "dev" ]
