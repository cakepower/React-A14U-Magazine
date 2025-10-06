
import { useState } from 'react';
import type { Slide } from '../types';

const mockSlides: Slide[] = [
 {
    id: 1,
    title: 'A14U, AI 트랜드 매거진의 탄생: 인공지능과 미적지능의 콜라보레이션',
    description: "인공지능은 어떻게 인간의 미적지능을 향상시칼까.",
    imageUrl: 'https://www.cakepower.net/media/a14u/cover_01.jpg',
    link: 'https://www.cakepower.net/',
  },
  {
    id: 2,
    title: '디자인 시스템의 미래: 인간 지능과 이질 지능의 공존',
    description: '최신 디자인 시스템은 어떻게 AI를 통합하여 워크플로우를 혁신하고 있는가. ',
    imageUrl: 'https://www.cakepower.net/media/a14u/cover_02.jpg',
    link: 'https://www.cakepower.net/category/About_insights/',
  },
  {
    id: 3,
    title: '사용자 경험을 극대화하는 마이크로인터랙션',
    description: '작지만 강력한 마이크로인터랙션이 어떻게 사용자 만족도를 높이고 브랜드 충성도를 구축하는지 실제 사례를 통해 알아봅니다.',
    imageUrl: 'https://www.cakepower.net/media/a14u/cover_03.jpg',
    link: 'https://www.cakepower.net/category/About_the_meeting/',
  },
  {
    id: 4,
    title: '지속 가능한 디자인: 환경을 생각하는 프로덕트 만들기',
    description: '디지털 제품이 환경에 미치는 영향을 줄이고, 사용자와 지구 모두에게 이로운 지속 가능한 디자인 원칙에 대해 논의합니다.',
    imageUrl: 'https://www.cakepower.net/media/a14u/cover_04.jpg',
    link: 'https://www.cakepower.net/category/About_the_game_design/',
    theme: 'light',
  },
  {
    id: 5,
    title: '데이터 시각화의 예술: 복잡한 정보를 아름답게 표현하기',
    description: '효과적인 데이터 시각화는 단순한 차트 그리기를 넘어섭니다. 통찰력을 제공하고 스토리를 전달하는 시각화 기법을 소개합니다.',
    imageUrl: 'https://www.cakepower.net/media/a14u/cover_05.jpg',
    link: 'https://www.cakepower.net/category/About_sensory_attunement/',
  },
];

export const useMockBlogData = () => {
  const [slides] = useState<Slide[]>(mockSlides);
  return slides;
};
