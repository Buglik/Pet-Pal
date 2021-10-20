'use strict';
const {exec, execSync} = require('child_process');
const path = require('path');
// const fs = require('fs');
const connectorPath = path.join(__dirname, 'src');
// language=Bash
execSync(`find "${connectorPath}" -type f -not -name '.openapi-generator-ignore' -delete`);

const ngVersion = '12.1.2';
const swaggerPath = `http://localhost:8000/api/schema`;
// language=Bash
const command = `npx \
openapi-generator-cli generate \
--additional-properties ngVersion=${ngVersion} \
--generator-name typescript-angular \
--input-spec ${swaggerPath} \
--output ${path.join(connectorPath)}`;

exec(command, (error, stdout) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }
  console.log(stdout)
})
