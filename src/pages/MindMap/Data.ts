import { type RawLaw, type TimelineItem } from './type';

export const data = [
  {
    problem: "법안을 국회에 처음 제출하는 절차는?",
    options: ["발의", "찬성", "개정", "공포"],
    answer: "발의",
    reason: "법안이 국회에 처음 제출되는 절차를 '발의'라고 합니다.\n국회의원 또는 정부가 법안을 국회에 공식적으로 제안하는 것이며, 발의된 법안은 이후 상임위원회 심사, 법제사법위원회, 본회의 의결 등의 절차를 거칩니다."
  },
  {
    problem: "'중대재해처벌법'의 주요 취지는 무엇인가요?",
    options: [
      "기업이 낸 세금을 높이기 위해 만든 법이다.",
      "노동자가 산재로 사망했을 때 기업의 경영책임자를\n처벌하기 위해 제정된 법이다.",
      "공공기관의 예산 집행을 감시하기 위한 법이다.",
      "소비자 권리 보호를 위해 만든 법이다."
    ],
    answer: "노동자가 산재로 사망했을 때 기업의 경영책임자를\n처벌하기 위해 제정된 법이다.",
    reason: "중대재해처벌법은 산업현장에서 노동자가 산재로 사망했을 때 등의 중대재해가 발생했을 때 경영책임자를 처벌하기 위해 규정한 법입니다."
  },
  {
    problem: "'근로기준법'에서 정한 법정 근로시간은 일반적으로 주 몇 시간인가요?",
    options: ["주 35시간", "주 40시간", "주 50시간", "주 52시간"],
    answer: "주 40시간",
    reason: "근로기준법상 법정 근로시간은 주 40시간이며, 연장근로 포함 시 최대 52시간까지 가능합니다."
  },
  {
    problem: "다음 중 '법률안 공포'에 대한 설명으로 맞는 것은?",
    options: [
      "법률이 확정되면 대통령이 이를 국민에게 알리는 절차이다.",
      "법률이 국회에서 가결되기 전 국민에게 알리는 절차이다.",
      "국회의장이 직접 국민에게 법률을 알리는 절차이다.",
      "국무총리가 법률의 시행일을 정하는 절차이다."
    ],
    answer: "법률이 확정되면 대통령이 이를 국민에게 알리는 절차이다.",
    reason: "법률안 공포는 대통령이 법률 확정을 공식적으로 국민에게 알리는 절차입니다."
  },
  {
    problem: "다음 중 법안이 본회의에서 의결된 후 거치는 절차가 아닌 것은 무엇인가요?",
    options: ["법률안 공포", "법제사법위원회 검토", "대통령의 거부권 행사 가능", "국민투표로 확정"],
    answer: "국민투표로 확정",
    reason: "일반 법안은 국민투표를 거치지 않고, 국회 의결 후 대통령 공포로 확정됩니다. 국민투표는 헌법 개정 등 특정 사안에만 해당됩니다."
  },
]

export const mockLaws: RawLaw[] = [
  {
    lawId: 1,
    lawSerialNumber: 2024001001,
    lawTitle: "청소년 보호법 일부개정법률안",
    lawContent: "청소년 유해 매체물의 범위를 확대하고, 관련 규제를 강화한다.",
    promulgationDate: "2024-05-01",
    resolutionResult: "공포"
  },
  {
    lawId: 2,
    lawSerialNumber: 2024001002,
    lawTitle: "개인정보보호법 일부개정법률안",
    lawContent: "개인정보 처리에 관한 동의 절차를 강화하고, 개인정보보호 위원회의 권한을 확대한다.",
    promulgationDate: "2024-04-15",
    resolutionResult: "공포"
  },
  {
    lawId: 3,
    lawSerialNumber: 2024001003,
    lawTitle: "교육기본법 일부개정법률안",
    lawContent: "디지털 교육환경 조성을 위한 법적 기반을 마련하고, 교육의 디지털화를 촉진한다.",
    promulgationDate: "2024-03-22",
    resolutionResult: "공포"
  },
  {
    lawId: 4,
    lawSerialNumber: 2024001004,
    lawTitle: "근로기준법 일부개정법률안",
    lawContent: "원격근무 및 유연근무제에 대한 규정을 신설하고, 근로자의 권익을 보장한다.",
    promulgationDate: "2024-06-10",
    resolutionResult: "공포"
  },
  {
    lawId: 5,
    lawSerialNumber: 2024001005,
    lawTitle: "환경보호법 일부개정법률안",
    lawContent: "탄소중립 실현을 위한 환경 규제를 강화하고, 친환경 산업 육성을 지원한다.",
    promulgationDate: "2024-07-01",
    resolutionResult: "공포"
  },
  {
    lawId: 6,
    lawSerialNumber: 2024001006,
    lawTitle: "소상공인 지원법 일부개정법률안",
    lawContent: "소상공인의 경영 안정을 위한 금융 지원을 확대하고, 디지털 전환을 지원한다.",
    promulgationDate: "2024-08-15",
    resolutionResult: "공포"
  },
  {
    lawId: 7,
    lawSerialNumber: 2024001007,
    lawTitle: "의료법 일부개정법률안",
    lawContent: "원격의료 서비스 확대와 의료진의 업무 범위를 조정한다.",
    promulgationDate: "2024-09-01",
    resolutionResult: "공포"
  },
  {
    lawId: 8,
    lawSerialNumber: 2024001008,
    lawTitle: "주택임대차보호법 일부개정법률안",
    lawContent: "임차인의 권익 보호를 강화하고, 전월세 상한제를 도입한다.",
    promulgationDate: "2024-02-28",
    resolutionResult: "공포"
  }
];

export const mockTimelineEvents: TimelineItem[] = [
  {
    id: 't1',
    date: '2024-02-28',
    title: '주택임대차보호법 개정',
    description: '임차인 권익 보호 강화',
    lawId: 8
  },
  {
    id: 't2',
    date: '2024-03-22',
    title: '교육기본법 개정',
    description: '디지털 교육환경 조성',
    lawId: 3
  },
  {
    id: 't3',
    date: '2024-04-15',
    title: '개인정보보호법 개정',
    description: '개인정보 처리 동의 절차 강화',
    lawId: 2
  },
  {
    id: 't4',
    date: '2024-05-01',
    title: '청소년 보호법 개정',
    description: '청소년 유해 매체물 규제 강화',
    lawId: 1
  },
  {
    id: 't5',
    date: '2024-06-10',
    title: '근로기준법 개정',
    description: '원격근무 및 유연근무제 도입',
    lawId: 4
  },
  {
    id: 't6',
    date: '2024-07-01',
    title: '환경보호법 개정',
    description: '탄소중립 환경 규제 강화',
    lawId: 5
  },
  {
    id: 't7',
    date: '2024-08-15',
    title: '소상공인 지원법 개정',
    description: '소상공인 금융 지원 확대',
    lawId: 6
  },
  {
    id: 't8',
    date: '2024-09-01',
    title: '의료법 개정',
    description: '원격의료 서비스 확대',
    lawId: 7
  }
];

export const recommendedTopics = [
  '청소년 보호',
  '개인정보 보호',
  '디지털 교육',
  '근로자 권익',
  '환경 보호',
  '사회 안전',
  '경제 발전',
  '기술 혁신'
];