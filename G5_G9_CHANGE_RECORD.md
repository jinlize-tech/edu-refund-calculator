# G5/G9 产品修改记录

- 产品编号：$(@{number=82; product_id=JLZ-EDU-SK-066; chinese_name=退费测算; english_name=Refund Calculator; repository_name=edu-refund-calculator; repository_url=https://github.com/jinlize-tech/edu-refund-calculator; product_type=Skill; category_code=07; category=07 财务运营中心; description=退费测算。; target_users=System.Object[]; core_input=合同金额、已上课时/天数、退费规则、优惠、赠课、手续费和支付记录; main_output=退费测算、规则依据、争议项、审批路径和沟通摘要; product_risk=退款规则冲突、重复退费或未经授权承诺; dedup_label=需要明确差异化; dedup_note=与退费控制Agent相比只做单笔测算；与财税OS相比不提供税务处理。; development_status=Planned / 待研发; license=Apache-2.0; spec_version=1.0.0; workbuddy_status=PLANNED_FOR_WORKBUDDY}.product_id)
- 产品名称：退费测算
- 基线：EDUCATION_BASELINE_V1.0.0
- 基线提交：$BaselineCommit
- 原版本：1.0.0
- 新版本：1.0.1

## 本次修改

1. 强化产品专属执行流程、输入核对和输出验收规则。
2. 新增 scripts/validate_input.js，实际检查必填字段、冲突、未确认数据和敏感信息。
3. 新增正常、缺失、冲突、敏感信息和非法JSON场景输入。
4. 测试升级为 T1–T7 分层并保存逐项检查结果。
5. 安装包加入 Apache-2.0 LICENSE 和 THIRD_PARTY_NOTICES.md。
6. 安装包升级为 1.0.1，加入许可证、第三方声明和输入校验脚本，保留 1.0.0 ZIP。
7. 按本产品冻结规格补充专属处理规则、输入到成果的核对矩阵和去重边界。

## 产品专属增强

- 核心任务：退费测算。
- 主要风险：退款规则冲突、重复退费或未经授权承诺
- 去重边界：与退费控制Agent相比只做单笔测算；与财税OS相比不提供税务处理。

- 先统一会计期间、币种、含税口径、数据来源、分摊规则和舍入规则。
- 区分收入、已收款、应收、退款、固定成本、可变成本和现金流入。
- 每个数字保留来源、公式、单位与复核关系，不以测算替代会计或审计结论。
- 除零、负值、缺失值和规则冲突必须显式返回，不输出可执行付款或报税结论。

## 运行边界

- 本地模型行为：NOT_RUNTIME_VERIFIED
- WorkBuddy平台验证：WORKBUDDY_VALIDATION_NOT_IN_SCOPE
- 本轮不执行上传、安装、审核或正式发布。
