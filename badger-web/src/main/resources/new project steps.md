## 1.复制

a.从demo项目复制api和web项目到工作空间,此时是没有git信息

## 2. 修改项目名

同时修改项目名与文件配置中的项目名:
```
a. pom.xml
b. .project
c. .settings/org.eclipse.wst.common.component
```

## 3.发布项目到git
a.导入项目到eclipse
b.eclipse中配置好新项目的git库
c.发布到git
```
	step1.右击项目--> team --> share projects --> git --> 库
	step2.ignore ./settings
	step3.commit
	step4.push
```