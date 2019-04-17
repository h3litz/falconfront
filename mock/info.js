import mockjs from 'mockjs';

const getOrigindomain = [
    {
      name: 'qq.com',
      company: 'tencent',
      resultfile: '/text',
      status: 1
    }
  ]

const Cdndomain = [
    {
      name: 'zhan.qq.com',
      origindomain: 'qq.com'
    }
  ]

const IP = mockjs.mock({
  'list|100': [{ip: '@ip',origin_domain:'qq.com',isCIDR:0, port_scan_time:'@now("year")',status: 1,}]
})
  
const Web = mockjs.mock({
  'list|50':[{url:'@url("http", "test.qq.com")',banner:'http',title: '@sentence(3, 5)',headers: '@paragraph(1)',origin_domain: 'qq.com',last_wvs_scan_time: '@now',last_infoleak_scan_time: '@now'}]
})

const Domain = mockjs.mock({
  'list|50': [{name:'@domain("qq.com")',"ips|1-10": ["@ip"],origin_domain: 'qq.com',web_scan_time: '@now',plugin_scan_time: '@now'}]
})

const Port = mockjs.mock({
  'list|50': [{ip:'@ip',status:'open','port|0-65535':80,service:'http',version:'http',web_scan_time: '@now',plugin_scan_time: '@now'}]
})

  export default {
    'GET /api/info/origindomain': getOrigindomain,
    'GET /api/info/ip': IP,
    'GET /api/info/web': Web, 
    'GET /api/info/domain': Domain,
    'GET /api/info/cdndomain': Cdndomain,
    'GET /api/info/port':Port,
  };
  