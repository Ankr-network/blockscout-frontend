# NAMES="polygon_zkevm"
# NAMES comes from workflow NAMES

# $ENV prod || stage
# $NAME name of chain in NAMES

# delete all build, chains dirs
if [ -d build ]; then rm -Rf build; fi
if [ -d build-chains ]; then rm -Rf build-chains; fi

for NAME in $NAMES; do
  if [ -d ${NAME} ]; then rm -Rf ${NAME}; fi
done

# build and rename dirs
for NAME in ${NAMES}; do
  echo $NAME

  mkdir -p build-chains

  REACT_APP_CHAIN_ID=${NAME} yarn build:${ENV}:turbo
  yarn postbuild
  mv build build-chains/${NAME}

  if [ $NAME = polygon_zkevm ]; then
    # build version with public path
    REACT_APP_CHAIN_ID=${NAME} node ./changeHomepage.js
    REACT_APP_CHAIN_ID=${NAME} REACT_APP_IS_BUILD_FOR_ERIGON_WITH_HOMEPAGE=true yarn build:${ENV}
    yarn postbuild
    node ./clearHomepage.js

    # move to folder
    mkdir -p build-chains/polygon
    mv build build-chains/polygon
    mv build-chains/polygon/build build-chains/polygon/zkevm
  fi
done
