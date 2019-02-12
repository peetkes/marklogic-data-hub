/**
  Copyright 2012-2019 MarkLogic Corporation

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
'use strict';
const defaultConfig = require("/com.marklogic.hub/config.sjs");

class HubUtils {
  constructor(config = null) {
    if(!config) {
      config = defaultConfig;
    }
    this.config = config;
  }
  getConfig() {
    return this.config;
  }
  writeJobDocument(docUri, job, collections){
    xdmp.eval('xdmp.documentInsert("' + docUri + '",' + 'job,' + '{permissions:xdmp.defaultPermissions(),collections:[' + collections +']})',
    {
    job: job,
    docUri:docUri,
    collections:collections
    },
    {
     database: xdmp.database(this.config.JOBDATABASE),
     commit: 'auto',
     update: 'true',
     ignoreAmps: true
    })
  }
  deleteJobDocument(docUri){
    xdmp.eval('xdmp.documentDelete("' + docUri + '")',
    {
      docUri:docUri
    },
    {
      database: xdmp.database(this.config.JOBDATABASE),
      commit: 'auto',
      update: 'true',
      ignoreAmps: true
    })
  }
  writeStagingDocument(docUri, collections){
    xdmp.eval('xdmp.documentInsert("' + docUri + '",'  + '{permissions:xdmp.defaultPermissions(),collections:[' + collections +']})',
      {
        job: job,
        docUri:docUri,
        collections:collections
      },
      {
        database: xdmp.database(this.config.STAGINGDATABASE),
        commit: 'auto',
        update: 'true',
        ignoreAmps: true
      })
  }
  deleteStagingDocument(docUri){
    xdmp.eval('xdmp.documentDelete("' + docUri + '")',
      {
        docUri:docUri
      },
      {
        database: xdmp.database(this.config.STAGINGDATABASE),
        commit: 'auto',
        update: 'true',
        ignoreAmps: true
      })
  }
}

module.exports = HubUtils;
