import * as changeCase from 'change-case';
import { existsSync, lstatSync, writeFile } from 'fs';

function hump2Underline(name: String): String {
    let newString = '';
    if (!name.includes('_')) {
        for (let i = 0; i < name.length; i++) {
            if (name[i] >= 'A' && name[i] <= 'Z') {
                newString += '_' + name[i].toLowerCase();
            } else {
                newString += name[i];
            }
        }
    }
    if (newString[0] == '_') {
        return newString.substring(1);
    } else {
        return newString;
    }
}

function lowercaseline(name: String) : String{
    let newString = "";
    var strList = name.split("_");
    for (let index = 0; index < strList.length; index++) {
        newString += strList[index].charAt(0).toUpperCase() + strList[index].substring(1);
    }
    return newString;
}
// export all package
export function pageNameTemplate(pageName: string, targetDirectory: string) {
    const pathName = changeCase.pascalCase(pageName.toLowerCase());
    const stateName = hump2Underline(pageName);
    const snakeCaseName = changeCase.snakeCase(pageName.toLowerCase());
    const targetPath = `${targetDirectory}/${stateName}/${pageName}.dart`;

    const template = `library ${snakeCaseName};

export 'model/model.dart';
export 'bean/bean.dart';
export 'model/model_contidion.dart';
export 'page/view.dart';
export 'page/widget.dart';
export 'state/state.dart';
`;

    return new Promise(async (resolve, reject) => {
        writeFile(targetPath, template, 'utf8', (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve;
        });
    });
}

// bean package
export function beanTemplate(pageName: string, targetDirectory: string) {
    const pathName = lowercaseline(pageName);
    const stateName = changeCase.snakeCase(pageName.toLowerCase());
    const snakeCaseName = changeCase.snakeCase(pageName.toLowerCase());
    console.log("pageName:" + pageName + ",pathName:" + pathName + ",stateName:" + stateName + ",snakeCaseName:" + snakeCaseName);
    const targetPath = `${targetDirectory}/${stateName}/bean/bean.dart`;
    const template = `

  class ${pathName}Bean {

    ${pathName}Bean();
    
  }
`;

    return new Promise(async (resolve, reject) => {
        writeFile(targetPath, template, 'utf8', (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve;
        });
    });
}

// model package
export function modelTemplate(pageName: string, targetDirectory: string) {
    const pathName = lowercaseline(pageName);
    const stateName = changeCase.snakeCase(pageName.toLowerCase());
    const snakeCaseName = changeCase.snakeCase(pageName.toLowerCase());
    const targetPath = `${targetDirectory}/${stateName}/model/model.dart`;
    const template = `import 'package:provider_base_tools/tools.dart';

import '../${pageName}.dart';
  
  class ${pathName}Model extends BaseModel<${pathName}State> {
    ${pathName}Model.getInstance(super.initial) : super.getInstance();
  
    @override
    bool get dataIsEmpty => false;
  
    @override
    List<VoidAsyncFunction> initFutures() {
      return [];
    }
  }
`;

    return new Promise(async (resolve, reject) => {

        writeFile(targetPath, template, 'utf8', (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve;
        });
    });
}

// model_contidion package
export function modelContidionTemplate(pageName: string, targetDirectory: string) {
    const pathName = lowercaseline(pageName);
    const stateName = changeCase.snakeCase(pageName.toLowerCase());
    const snakeCaseName = changeCase.snakeCase(pageName.toLowerCase());
    const targetPath = `${targetDirectory}/${stateName}/model/model_contidion.dart`;
    const template = `import '../${pageName}.dart';

    extension ${pathName}ModelContidion on ${pathName}Model {
      
    }
`;

    return new Promise(async (resolve, reject) => {

        writeFile(targetPath, template, 'utf8', (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve;
        });
    });
}

// model_get package
export function modelGetTemplate(pageName: string, targetDirectory: string) {
    const pathName = lowercaseline(pageName);
    const stateName = changeCase.snakeCase(pageName.toLowerCase());
    const snakeCaseName = changeCase.snakeCase(pageName.toLowerCase());
    const targetPath = `${targetDirectory}/${stateName}/model/model_get.dart`;
    const template = `import 'model.dart';

    extension ${pathName}ModelGet on ${pathName}Model {
      
    }
`;

    return new Promise(async (resolve, reject) => {

        writeFile(targetPath, template, 'utf8', (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve;
        });
    });
}

// model_set package
export function modelSetTemplate(pageName: string, targetDirectory: string) {
    const pathName = lowercaseline(pageName);
    const stateName = changeCase.snakeCase(pageName.toLowerCase());
    const snakeCaseName = changeCase.snakeCase(pageName.toLowerCase());
    const targetPath = `${targetDirectory}/${stateName}/model/model_set.dart`;
    const template = `import 'model.dart';

    extension ${pathName}ModelSet on ${pathName}Model {
      
    }
`;

    return new Promise(async (resolve, reject) => {

        writeFile(targetPath, template, 'utf8', (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve;
        });
    });
}

// view package
export function viewTemplate(pageName: string, targetDirectory: string) {
    const pathName = lowercaseline(pageName);
    const stateName = changeCase.snakeCase(pageName.toLowerCase());
    const snakeCaseName = changeCase.snakeCase(pageName.toLowerCase());
    const targetPath = `${targetDirectory}/${stateName}/page/view.dart`;
    const template = `import 'package:flutter/material.dart';
import 'package:provider_base_tools/tools.dart';
    
import '../${stateName}.dart';
    
    class ${pathName}Page extends InitBaseStatelessWidget<${pathName}Model,${pathName}State> {
      const ${pathName}Page({super.key});
    
      @override
      void finish() {}
    
      @override
      ${pathName}Model getModel() {
        return ${pathName}Model.getInstance(${pathName}State());
      }
    
      @override
      Widget successedBuilder(BuildContext context) {
        return getChildView();
      }
    }
`;

    return new Promise(async (resolve, reject) => {

        writeFile(targetPath, template, 'utf8', (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve;
        });
    });
}

// widget package
export function widgetTemplate(pageName: string, targetDirectory: string) {
    const pathName = lowercaseline(pageName);
    const stateName = changeCase.snakeCase(pageName.toLowerCase());
    const snakeCaseName = changeCase.snakeCase(pageName.toLowerCase());
    const targetPath = `${targetDirectory}/${stateName}/page/widget.dart`;
    const template = `import 'package:flutter/material.dart';

import '../${stateName}.dart';
    
    extension ${pathName}Widget on ${pathName}Page {
      
      Widget getChildView() => throw UnimplementedError();
    }
`;

    return new Promise(async (resolve, reject) => {

        writeFile(targetPath, template, 'utf8', (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve;
        });
    });
}

// state package
export function stateTemplate(pageName: string, targetDirectory: string) {
    const pathName = lowercaseline(pageName);
    const stateName = changeCase.snakeCase(pageName.toLowerCase());
    const snakeCaseName = changeCase.snakeCase(pageName.toLowerCase());
    const targetPath = `${targetDirectory}/${stateName}/state/state.dart`;
    const template = `

    class ${pathName}State{
        ${pathName}State({this.tag});
        String? tag;
     }
`;

    return new Promise(async (resolve, reject) => {

        writeFile(targetPath, template, 'utf8', (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve;
        });
    });
}
