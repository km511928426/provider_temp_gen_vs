import * as changeCase from 'change-case';
import { existsSync, lstatSync, writeFile } from 'fs';

function hump2Underline(name: String): String {
    let newString = '';
    name.split('_').forEach((item, index) => {
        newString += index==0 ? item.toLowerCase() : "_" + item.toLowerCase();
    });
    return newString;

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
    const pathName = changeCase.snakeCase(pageName.toLowerCase());
    const stateName = hump2Underline(pageName);
    const snakeCaseName = changeCase.snakeCase(pageName.toLowerCase());
    const targetPath = `${targetDirectory}/${stateName}/${pathName}.dart`;
    const template = `library ${snakeCaseName};

export 'bean/bean.dart';
export 'model/model.dart';
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
    const template = `import 'package:flutter/foundation.dart';
import 'package:provider/provider.dart';

import '../${stateName}.dart';
  
class ${pathName}Model with ChangeNotifier,DiagnosticableTreeMixin{
    final state = ${pathName}State();
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
import 'package:provider/provider.dart';

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


// // model_get package
// export function modelGetTemplate(pageName: string, targetDirectory: string) {
//     const pathName = lowercaseline(pageName);
//     const stateName = changeCase.snakeCase(pageName.toLowerCase());
//     const snakeCaseName = changeCase.snakeCase(pageName.toLowerCase());
//     const targetPath = `${targetDirectory}/${stateName}/model/model_get.dart`;
//     const template = `import '../${stateName}.dart';

// extension ${pathName}ModelGet on ${pathName}Model {
  
// }
// `;

//     return new Promise(async (resolve, reject) => {

//         writeFile(targetPath, template, 'utf8', (error) => {
//             if (error) {
//                 reject(error);
//                 return;
//             }
//             resolve;
//         });
//     });
// }

// // model_set package
// export function modelSetTemplate(pageName: string, targetDirectory: string) {
//     const pathName = lowercaseline(pageName);
//     const stateName = changeCase.snakeCase(pageName.toLowerCase());
//     const snakeCaseName = changeCase.snakeCase(pageName.toLowerCase());
//     const targetPath = `${targetDirectory}/${stateName}/model/model_set.dart`;
//     const template = `import '../${stateName}.dart';

// extension ${pathName}ModelSet on ${pathName}Model {
  
// }
// `;

//     return new Promise(async (resolve, reject) => {

//         writeFile(targetPath, template, 'utf8', (error) => {
//             if (error) {
//                 reject(error);
//                 return;
//             }
//             resolve;
//         });
//     });
// }

// view package
export function statefulTemplate(pageName: string, targetDirectory: string) {
    const pathName = lowercaseline(pageName);
    const stateName = changeCase.snakeCase(pageName.toLowerCase());
    const snakeCaseName = changeCase.snakeCase(pageName.toLowerCase());
    const targetPath = `${targetDirectory}/${stateName}/page/view.dart`;
    const template = `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
    
import '../${stateName}.dart';
    
class ${pathName}Page extends StatefulWidget {
    const ${pathName}Page({Key? key}) : super(key: key);
  
    @override
    State<${pathName}Page> createState() => _${pathName}PageState();
  }
  
  class _${pathName}PageState extends State<${pathName}Page> {
    @override
    Widget build(BuildContext context) {
      return ChangeNotifierProvider<${pathName}Model>.value(
        value: ${pathName}Model(),
        builder: (context, child) => widget.getChildView(context),
      );
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
  
  Widget getChildView(BuildContext context) => throw UnimplementedError();
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
